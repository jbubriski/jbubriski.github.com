---
date: '2012-02-09 08:00:33'
layout: post
slug: sql-server-cell-level-symmetric-encryption-the-right-way
status: publish
title: 'SQL Server Cell-Level Symmetric Encryption: The right way'
wordpress_id: '1160'
categories:
- Programming
tags:
- AdventureWorks
- AES
- Cell-Level Encryption
- Certificates
- Credit Cards
- Cryptography
- Decryption
- Encryption
- SQL
- SQL Server
- Symmetric Encryption
- TDE
- Transparent Data Encryption
---

So I needed to encrypt some sensitive data being stored in SQL Server. I looked into encrypting the data at the application level via C#, but that would mean I would need to ship encrypted data and keys around, which defeats the purpose (we use a thick client). So I turned to SQL Server to handle the encryption for me, and I was pleasantly surprised!

## Types of Encryption

There are 2 general types of encryption in SQL Server that you can employ:

- **TDE (Transparent Data Encryption)** - Encrypts your whole database. Available only in SQL Server 2008 Enterprise Edition and SQL Server 2008 Developer Edition (and later).
- **Cell-Level Encryption** - Encrypts individual cells. Available in all SQL Server editions (since 2000 I think).

There are other ways to encrypt your data, such as encrypting your entire hard drive, but we'll focus on the options directly provided by SQL Server. For the purpose of this article, we'll be focusing on Cell-Level Encryption.

## When is SQL Server Encryption Recommended?

You might want to use SQL Server Encryption if you want to minimize the changes to your application code. Injecting encryption code into an existing codebase can be painful, especially if you have to modify all your data access code. Encryption via SQL Server can help limit your attack surface since your sensitive data will spend less time at the client, whether that be your web server or a thick client.

## Limitations/Drawbacks.

You have to modify your database to use varbinary fields instead of plain varchar or nvarchar fields. While I don't think this is a huge deal, it might be a problem for those who don't have free reign over their DB schema, or when the database table is being accessed directly by multiple applications. If you're using Stored Procedures or a common Data Access Layer, this isn't a big deal.

## Show me the code!

Let's say we want to encrypt some credit cards. I'm using the [AdventureWorks](http://msftdbprodsamples.codeplex.com/) sample database from Microsoft for my example so the code below should work on your machine too. Plus, the AdventureWorks DB is already storing unencrypted credit cards! Oh noes!

First, we need a Master Key. The Master Key encrypts your other keys to keep them safe.

    IF NOT EXISTS
    (SELECT * FROM sys.symmetric_keys WHERE symmetric_key_id = 101)
    CREATE MASTER KEY ENCRYPTION BY
    PASSWORD = 'Some long key that you will guard with your life'
    GO

**(Important: Make sure you save your Master Key Password someplace safe!)**

Now we need to create a Symmetric Key that will encrypt the data, and a Certificate to access the Key:

    CREATE CERTIFICATE CreditCards
    WITH SUBJECT = 'Customer Credit Card Numbers';
    GO
    
    CREATE SYMMETRIC KEY CreditCards_Key_01
    WITH KEY_SOURCE = 'A pass phrase from which to derive the key.',
    IDENTITY_VALUE = 'An identity phrase from which to generate a GUID for tagging data that is encrypted with a temporary key',
    ALGORITHM = AES_256
    ENCRYPTION BY CERTIFICATE CreditCards;
    GO

**(Important: Like the Master Key Password, make sure you store the Symmetric Key KEY_SOURCE and IDENTITY_VALUE someplace safe!)**

The first block will generate a Certificate that allows you to easily work with the Key without having to provide the Password for that Key. The second block will generate the actual Symmetric Key that is used to perform the encryption and decryption. The Key_Source and Identity_Value options tell SQL Server to generate the Key in a specific way. If we need to regenerate the key on another instance/server we can pass in the same values and get the same Key. This is very important in the case that your server ever dies or you need to migrate your keys for other reasons. The Algorithm is specifying the 256 bit version of the AES encryption algorithm. It's a standardized, strong algorithm that is frequently used. Finally, note the 2nd to last line where we reference the Certificate.

I would recommend that you always create your Key with a Key_Source and Identity_Value. Without them, I'm not even sure if you can retrieve your Key, and it will definitely be easier tto recreate the Key having those two items on hand. As [Michael Coles](http://sqlblog.com/blogs/michael_coles/archive/2009/06/17/cloning-symmetric-keys.aspx) said:

> "For my tastes, it would make more sense to require `IDENTITY_VALUE` and `KEY_SOURCE` options by default."

Now let's add an extra column to our table to store the encrypted data:

    ALTER TABLE Sales.CreditCard
    ADD CreditCardNumberEncrypted varbinary(128);
    GO

**(Note: I haven't run into any problems with my own data, but if you're storing "bigger" data, then you might need to increase the varbinary column size)**

Great! Now we can encrypt our existing data into the new column:

    OPEN SYMMETRIC KEY CreditCards_Key_01
    DECRYPTION BY CERTIFICATE CreditCards
    
    UPDATE Sales.CreditCard
    SET CreditCardNumberEncrypted = EncryptByKey(Key_GUID('CreditCards_Key_01'), CardNumber);
    GO

Finally, let's look at the data in the table now.

    OPEN SYMMETRIC KEY CreditCards_Key_01
    DECRYPTION BY CERTIFICATE CreditCards;
    GO
    
    SELECT
    CardNumber
        , CreditCardNumberEncrypted
        , CONVERT(nvarchar, DecryptByKey(CreditCardNumberEncrypted)) AS 'Decrypted Credit Card Number'
    FROM Sales.CreditCard
    GO

**(Important: If you're not seeing the correct data come back, make sure that you are converting to the correct type of the original data! In this case, the data was from a nvarchar column. Also, make sure you're decrypting the correct column.)**

That should spit back the original credit card number, the encrypted version, and then the decrypted version (which should match the original).

At this point all of your data should be encrypted, and you should be able to drop the unencrypted column. If you're working with existing code, you can rename the Encrypted column to match the old name, and just make sure you decrypt the data in your queries. In the specific case of credit cards, you might want to add an additional column to store the last four digits unencrypted for easier retrieval.

**(Important: Never store the CCV/CVV from credit cards. I'm pretty sure it's illegal.)**

One last note. If your application user doesn't have full access to the database (which it probably shouldn't) then you will need to grant some permissions in order for the user to use the encryption Certificate and Key. From the MSDN: "VIEW DEFINITION permission on the Symmetric Key and CONTROL permission on the Certificate" are required:

    GRANT VIEW DEFINITION ON SYMMETRIC KEY::CreditCards_Key_01
    TO Test;
    
    GRANT CONTROL ON CERTIFICATE::CreditCards
    TO Test;

Just make sure that you are handling permissions correctly!

Thanks for listening, and let me know if you have any feedback!

## Full Script

Attached is a SQL Server script of all the commands from the post:

[Setup Credit Card Encryption on AdventureWorks SQL Script](http://www.johnnycode.com/blog/wp-content/uploads/2012/02/Setup-Credit-Card-Encryption-on-AdventureWorks.zip)

## Resources/References

Below are some of the references and resources I used to write this post.

### General

- [ Good overview of Encryption in SQL Server 2008](http://msdn.microsoft.com/en-us/library/cc278098(v=sql.100).aspx#_Toc189384675)
- [ Encryption Hierarchy](http://msdn.microsoft.com/en-us/library/ms189586(v=sql.100).aspx)
- [ How to: Encrypt a Column of Data](http://msdn.microsoft.com/en-us/library/ms179331(v=sql.100).aspx)

### Backup/Regeneration of Keys and Certificates

- [ "Cloning" Symmetric Keys](http://sqlblog.com/blogs/michael_coles/archive/2009/06/17/cloning-symmetric-keys.aspx)
- [ How to: Create Identical Symmetric Keys on Two Servers](http://msdn.microsoft.com/en-us/library/ms366281.aspx)
- [ Deleting and Re-creating Encryption Keys](http://msdn.microsoft.com/en-us/library/ms156010.aspx)
- [ My ServerFault question on the subject](http://serverfault.com/questions/356237/do-i-need-to-back-up-the-sql-server-encryption-password-and-symmetric-key/356303#356303)

### MSDN T-SQL References

- [ varbinary](http://msdn.microsoft.com/en-us/library/swbw1ewb(v=vs.80).aspx)
- [ CREATE SYMMETRIC KEY](http://msdn.microsoft.com/en-us/library/ms188357.aspx)
- [ OPEN SYMMETRIC KEY](http://msdn.microsoft.com/en-us/library/ms190499.aspx)
- [ GRANT Symmetric Key Permissions](http://msdn.microsoft.com/en-us/library/ms179887.aspx)
- [ GRANT Certificate Permissions](http://msdn.microsoft.com/en-us/library/ms186278.aspx)
