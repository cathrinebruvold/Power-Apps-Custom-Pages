# Create Custom Pages

Learn how to **build Custom Pages** with focus on **responsive design**, and accessing **Model-Driven App record details**


## Overview 

**🎯 Goal:** 
- Build Custom Pages to be used as a full page, side pane and dialog in a Model-Driven App
- Connect to relevant datasources
- Fetch record details using the Param() function and connecting to the record context
- Develop responsive apps

**✅ Prerequisites** 
- Existing solution in a Power Platform environment
- System Customizer or System Administrator security role
- Access to datasources


## Instructions

In this lab, you will do the following:

**Build responsive Custom Pages with modern design elements**

**Create a Landing Page**
1. Within your solution, click **+ New** -> **App** -> **Page**
2. Name it **Main Landing Page**
3. Check settings. 
    - *Scale to Fit* should be **Off**
    - *Automatic save every 2 minutes* is recommended to be **On**

**Build a Responsive Layout**
Nest containers to group related content (build one horizontal container in a Vertical)

1. Add a vertical container for structured alignment
2. Adjust X property to (Parent.Height - Self.Height)/2
3. Adjust Y property to (Parent.Width-Self.Width)/2

<pre> Power Fx 
X: (Parent.Width - Self.Width) / 2
Y: (Parent.Height - Self.Height) / 2
</pre>

*💡 This will center and align the main container*



**Fetch Record Information**
1. Add datasource (Dataverse, SharePoint etc.)
2. Select **App** in the left corner and click **Formulas**
3. Create a formula for referencing the record GUID and use the function GUID() to ensure correct type

<pre> Power Fx 
nfRecordItem =
    If(
        "," in Text(Param("recordId")),
        LookUp(Table, 'Unique GUID field' = GUID(Last(Split(Param("recordId"), ",")).Value)),
        LookUp(Table, 'Unique GUID field'  = GUID(Param("recordId")))
    ); </pre>

The record can also be wrapped in {} so that needs to be removed in some cases:

<pre> 
Power Fx GUID(Substitute(Substitute(Param("recordId"), "{", ""), "}", ""))</pre>

*Named Formulas needs to be closed using ;*

*Explanation: Param() function gets the record GUID parsed from the JavaScript, and GUID() formats the output as GUID, not a string. We are also checking if there are several records selected by splitting the string after ","*