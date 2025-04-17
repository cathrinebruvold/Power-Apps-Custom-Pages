function idWithoutBrackets(id) {
    if (id.slice(0, 1) === "{") {
        return id.slice(1, -1);
    } else {
        return id;
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
async function openCustomPage(pageName, title, entityName = "", id = "", width = 600, height = 400, target = 2, position = 1) {
    const defaultWidth = 600;
    const defaultHeight = 400;
    const recId = idWithoutBrackets(id);
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