/* eslint-disable promise/always-return */
function redirectToCustomPage(primaryControl) {
    try {
        var formContext = primaryControl; // Form context passed from button
        var entityName = formContext.data.entity.getEntityName();
        var recordId = formContext.data.entity.getId();

        // Define navigation options for the dialog
        var pageInput = {
            pageType: "custom",
            name: "cb_sidepanedialog_eb8cd", // Replace with your custom page name
            entityName: entityName,
            recordId: recordId
        };

        var navigationOptions = {
            target: 2, // Open as a dialog
            width: { value: 700, unit: "px" }, // Dialog width
            height: { value: 500, unit: "px" }, // Dialog height
            position: 2 // Centered dialog
        };

        // Navigate to the custom page as a dialog
        Xrm.Navigation.navigateTo(pageInput, navigationOptions)
            .then(function () {
                console.log("Dialog opened successfully.");
            })
            .catch(function (error) {
                console.error("Error opening dialog:", error.message);
            });
    } catch (error) {
        console.error("Error in redirectToCustomPage:", error.message);
    }
}
