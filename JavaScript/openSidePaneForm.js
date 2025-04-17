/* eslint-disable no-undef */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
// Store the pane instance globally to reference it later for closing
var sidePaneInstance = null;

function onRecordSelect(pageName) {
    // If a pane is already open, close it before opening a new one
    if (sidePaneInstance) {
        sidePaneInstance.close();
        sidePaneInstance = null;
    }
    Xrm.App.sidePanes.createPane({
        title: "Sexy PDF viewer",
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
            name: pageName
            //recordId: recordId
        });
    });
}
