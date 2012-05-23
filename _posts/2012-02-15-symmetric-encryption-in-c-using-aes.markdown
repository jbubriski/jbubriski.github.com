---
date: '2012-02-15 08:00:30'
layout: post
slug: symmetric-encryption-in-c-using-aes
status: publish
title: Introducing Encryptamajig, Symmetric Encryption in C# using AES
wordpress_id: '1192'
categories:
- Programming
tags:
- .NET Framework
- AES
- C#
- Cryptography
- Decryption
- Encryption
- Rijndael
- Symmetric Encryption
---

This isn't my normal type of "full" post. Rather, I wanted to plug my own project which attempts to "standardize" the way people do [Symmetric Encryption](http://en.wikipedia.org/wiki/Symmetric-key_algorithm) in .NET using the [AES algorithm](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard) (the successor to Rijndael).

**It's called [Encryptamajig](https://github.com/jbubriski/Encryptamajig).**

To quote the project readme:

> "When you look at encryption examples online many are verbose, misleading, outdated, or flat out insecure. By creating this project I hope to provide a single resource that myself and others can use to incoporate encryption into their .NET projects.

My goal is to make sure this project uses an up-to-date encryption algorithm and forces appropriate usage of that algorithm."

The interface has been simplified so all you need to do is make 2 calls, 1 for encryption and 1 for decryption:

    var _key = "Keep me safe";
    var _plainText = "Some plaintext you want to encrypt";
    
    var encrypted = AesEncryptamajig.Encrypt(_plainText, _key);
    var roundtrip = AesEncryptamajig.Decrypt(encrypted, _key);

For more information about the project, and encryption, take a look at the well written readme on [the project page](https://github.com/jbubriski/Encryptamajig). If you have something to contribute to the project, just send me a pull request on Github!
