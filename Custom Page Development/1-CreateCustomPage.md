# Create Custom Pages

Learn how to **build Custom Pages** with focus on **responsive design**, and accessing **Model-Driven App record details**


## Overview 

**🎯 Goal:** 
- Build custom pages to be used as a full page, side pane and dialog in a Model-Driven App
- Connect to relevant datasources
- Fetch record details using the Param() function and connecting to the record context
- Develop responsive apps

**✅ Prerequisites** 
- Existing solution in a Power Platform environment
- System Customizer or System Administrator security role
- Access to datasources


## 💡 Instructions

- Exercise 1: **Create a landing page**
- Exercise 2: **Create a side pane**
- Exercise 3: **Create a dialog**
- Exercise 4: **Build a responsive layout and style your pages**
- Exercise 5: **Fetch record details from the model-driven app record**

## ✍️ Exercise 1: Create a Landing Page and Configure Settings

We will begin by creating the first custom **Landing Page** that will be presented to the users. This page will set the tone for the app and give users a clear "home base" to work from as the first thing they will see when opening the application.

1. Navigate to the [Power Apps Maker portal](https://make.powerapps.com) and ensure you are in the **Developer** environment you created in Lab 0.  
2. Select **Solutions** from the left navigation pane.  

   ![Step 1](Images/Lab2-CreateCustomPages/E1_1.png)

3. Select the solution you created in Lab 0.  

   ![Step 2](Images/Lab2-CreateCustomPages/E1_2.png)

4. In the solution, select **New** → **App** → **Page** from the command bar.  

   ![Step 3](Images/Lab2-CreateCustomPages/E1_3.png)

5. The canvas designer page will load. Click on **Settings** in the ribbon (sometimes settings will be located behind the three dots).  

   ![Step 4](Images/Lab2-CreateCustomPages/E1_4.png)

6. On the **General** tab, edit the name of the page to be **Landing Page** by clicking the edit pen and clicking **Save**.  

   ![Step 5](Images/Lab2-CreateCustomPages/E1_5.png)

7. Update the **Description** of the custom page to something relevant, such as:  
   ```text
   Landing page for the application


You will be doing the following:

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