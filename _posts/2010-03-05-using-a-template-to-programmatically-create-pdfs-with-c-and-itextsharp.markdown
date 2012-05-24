---
date: '2010-03-05 00:21:34'
layout: post
slug: using-a-template-to-programmatically-create-pdfs-with-c-and-itextsharp
status: publish
title: Using a template to programmatically create PDFs with C# and iTextSharp
wordpress_id: '232'
categories:
- Programming
tags:
- C#
- Code
- iTextSharp
- Open Office
- pdf
- template
---

Recently we upgraded a client's e-commerce solution from a home grown Ruby app to a .NET e-commerce application.  Part of the whole upgrade was that I needed to replicate a product personalization process that they had.  Basically, a customer enters information during checkout and a custom PDF document is generated for them including the information they had previously entered.  This is a fairly popular feature and you see it on websites that make stationary or party favors and decorations.

There are a lot of commercial products out there for creating PDF's, but free is better!  In order to recreate this functionality (for free), I needed to figure out how to create some sort of PDF template.  With a template in place I would need to programmatically do replacements to generate custom documents.  The rest of the project would be cake.

In order to create the template, I simply followed this tutorial: [How-to: Create PDF forms with OpenOffice](http://danilop.wordpress.com/2008/07/02/how-to-create-pdf-forms-with-openoffice/).  It is as simple as creating a new document in Open Office, dropping in some text field controls, and exporting it to PDF.  Part 1 done.  You could probably use another document editor program like Microsoft Word, but this happened to work fine and it's Free and Open Source (FOSS).

For part 2, I used iTextSharp to programmatically load the template PDF, perform the replacements, and save out that new PDF.  It was surprisingly easy, and I've created some sample code below, based on a [Java  example I found](http://itextpdf.com/examples/index.php?page=example&id=122) (iTextSharp is a port of the Java project iText).  One additional thing I've done at the end is to "flatten" the form, which makes it so that the fields wont be editable on the new PDF.  You can flatten the entire form, or specify fields to flatten so the rest of the form will be usable.  For example, you could flatten a person's name and address, and then let them fill out the rest of the form.

Check out the code below:

    using System.IO;
    using iTextSharp.text.pdf;
    
    namespace PDFTest
    {
        public class PdfTest
        {
            public static void ReplacePdfForm()
            {
                string fileNameExisting = @"C:\path\to\existing.pdf";
                string fileNameNew = @"C:\path\to\new.pdf";
    
                using (var existingFileStream = new FileStream(fileNameExisting, FileMode.Open))
                using (var newFileStream = new FileStream(fileNameNew, FileMode.Create))
                {
                    // Open existing PDF
                    var pdfReader = new PdfReader(existingFileStream);
    
                    // PdfStamper, which will create
                    var stamper = new PdfStamper(pdfReader, newFileStream);
    
                    var form = stamper.AcroFields;
                    var fieldKeys = form.Fields.Keys;
    
                    foreach (string fieldKey in fieldKeys)
                    {
                        form.SetField(fieldKey, "REPLACED!");
                    }
    
                    // "Flatten" the form so it wont be editable/usable anymore
                    stamper.FormFlattening = true;
    
                    // You can also specify fields to be flattened, which
                    // leaves the rest of the form still be editable/usable
                    stamper.PartialFormFlattening("field1");
    
                    stamper.Close();
                    pdfReader.Close();
                }
            }
        }
    }

You can find more information about the iTextSharp project on the [iTextSharp Homepage on SourceForge](http://itextsharp.sourceforge.net/).  Just keep in mind that you may stumble upon Java Examples, but fret not!  Java is very similar to C# so you can easily port the samples as I did.  Just use intellisense to help you find subtle differences in the syntax.
