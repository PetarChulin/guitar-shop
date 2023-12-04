
export const productType = (title) => {

    let type = title.toString().split(" ")[0].toLowerCase();
    let array = title.toString().split(" ");
    const arraySize = array.length;
    if (arraySize === 2) {
        type = type.concat('_guitars')
    }

    return type;
};