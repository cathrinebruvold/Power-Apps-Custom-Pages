// Store the pane instance globally to reference it later for closing
var sidePaneInstance = null;

function openSidePaneForRecord(recordId, pageName = "") {
    // If a pane is already open, close it before opening a new one
    if (sidePaneInstance) {
        sidePaneInstance.close();
        sidePaneInstance = null;
    }

    Xrm.App.sidePanes.createPane({
        title: "Side Pane",
        imageSrc: "WebResources/mspp_content_snippets.svg",
        hideHeader: true,
        canClose: true,
        width: 600
    }).then((pane) => {
        // Save the pane instance to use it for future actions (like closing)
        sidePaneInstance = pane;
        // Navigate to the desired page in the pane
        pane.navigate({
            pageType: "custom",
            name: pageName,
            recordId: recordId
        });
    }).catch((error) => {
        console.error("Error creating side pane:", error);
    });
}

// Add a custom button in the view ribbon to trigger the pane
function onRecordSelect(selectedItems) {
    if (selectedItems.length > 0) {
        console.log("selectedItems is bigger than 0");
        console.log("Selected item id: " + selectedItems[0].id);
        openSidePaneForRecord(selectedItems[0].id);
        // Refresh the ribbon to update the button state
        Xrm.Ribbon.reenableControls();
    } else {
        console.log("No records selected.");
    }
}