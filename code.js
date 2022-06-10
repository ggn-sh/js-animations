//Listen to a change
document.addEventListener('change', unitAreaMeasurement);

function unitAreaMeasurement(e) {
    if (e.target.matches('.configration_measurement_unit')) {
        // const unitVal = e.target.value;
        let parentColDiv = e.target.parentElement.parentElement //get parent div
        console.log(parentColDiv.nextElementSibling.closest("div > div > label")); //get next sibling
    }
}