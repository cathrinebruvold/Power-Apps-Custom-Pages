async function openCustomPage(pageName, title, entityName = "", id = "", width = 500, height = 380, target = 2, position = 1, canClose = true, imageSrc = "", hideHeader = false) {
    const defaultWidth = 500;
    const defaultHeight = 380;
    const recId = idWithoutBrackets(id);
    if (target === undefined) {
        target = 2;
    }
    if (position === undefined) {
        position = 1;
    }
    if (canClose === undefined) {
        canClose = true;
    }
    if (imageSrc === undefined) {
        imageSrc = "";
    }
    if (hideHeader === undefined) {
        hideHeader = false;
    }
    if (target === 3) {
        const paneOptions = {
            title: title,
            paneId: id,
            width: convertToNumber(width, defaultWidth),
            canClose: canClose,
            imageSrc: imageSrc,
            hideHeader: hideHeader,
        };
        return Xrm.App.sidePanes
            .createPane(paneOptions)
            .then((pane) => {
            pane.navigate({
                pageType: "custom",
                name: pageName,
            });
            return true;
        })
            .catch(function (error) {
            // Handle error
            console.log(error.message);
        });
    }
    else {
        const pageInput = {
            pageType: "custom",
            name: pageName,
            entityName: entityName,
            recordId: recId,
        };
        const navigationOptions = {
            target: target,
            width: convertToSize(width, defaultWidth),
            height: convertToSize(height, defaultHeight),
            position: position,
            title: title,
        };
        Xrm.Navigation.navigateTo(pageInput, navigationOptions)
            .then(function () {
            // Called when page opens
            return true;
        })
            .catch(function (error) {
            // Handle error
            console.log(error.message);
        });
    }
}

function convertToSize(input, defaultSize) {
    let result = defaultSize;
    if (typeof input === "number") {
        if (input > 0) {
            result = input;
        }
    }
    else {
        const parsedInput = Number(input);
        if (isNaN(parsedInput)) {
            if (input.endsWith("px")) {
                const numberPart = Number(input.substring(0, input.length - 2));
                if (!isNaN(numberPart)) {
                    result = { value: numberPart, unit: "px" };
                }
            }
            else if (input.endsWith("%")) {
                const numberPart = Number(input.substring(0, input.length - 1));
                if (!isNaN(numberPart)) {
                    result = { value: numberPart, unit: "%" };
                }
            }
        }
        else {
            if (parsedInput > 0) {
                result = parsedInput;
            }
        }
    }
    return result;
}

function convertToNumber(input, defaultSize) {
    let result = defaultSize;
    if (typeof input === "number") {
        if (input > 0) {
            result = input;
        }
    }
    else if (typeof input === "string") {
        const parsedInput = Number(input);
        if (isNaN(parsedInput)) {
            if (input.endsWith("px")) {
                const numberPart = Number(input.substring(0, input.length - 2));
                if (!isNaN(numberPart)) {
                    result = numberPart;
                }
            }
            else if (input.endsWith("%")) {
                const numberPart = Number(input.substring(0, input.length - 1));
                if (!isNaN(numberPart)) {
                    result = defaultSize;
                }
            }
        }
        else {
            if (parsedInput > 0) {
                result = parsedInput;
            }
        }
    }
    return result;
}

function idWithoutBrackets(id) {
    if (id && id.slice(0, 1) === "{") {
        return id.slice(1, -1);
    }
    else {
        return id;
    }
}