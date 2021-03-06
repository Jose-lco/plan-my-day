let AMPM = function (hours) {
    let ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours ? hours : 12;
    return hours + ampm;
};
let retrieveEvents = function (key) {
    let value = localStorage.getItem(key);
    $(`#text${key}`).val(value);
};
let currentHour = new Date().getHours();
let changeColors = function () {
    $(".description").each(function () {
        var hours = parseInt($(this).attr("id"))
        switch (true) {
            case (hours < currentHour):
                $(this).removeClass("present future").addClass("past");
                break;
            case (hours == currentHour):
                $(this).removeClass("future past").addClass("present");
                break;
            case (hours > currentHour):
                $(this).removeClass("present past").addClass("future");
                break;
        }
    })
}
let displayDailyPlanner = function () {
    let now = moment().format('dddd MMMM Do YYYY');
    $("#currentDay").text(now);
    for (let i = 9; i < 18; i++) {
        let hourlyRow =
            `<div class="row ">
        <div class="col-sm-2 hour">
                <p> ${AMPM(i)} </p>
        </div>
        <div id=${i} class="col-sm-8 description">
            <textarea id =text${i} placeholder="Add event here..."></textarea>
        </div>
        <div class="col-sm-2 saveBtn">
            <button class="fas fa-save"></button>
        </div>
    </div>`
        $(".container").append(hourlyRow);
        retrieveEvents(i);
    };
};
let storeEvents = function (hours) {
    let hourlyEvent = $(`#text${hours}`).val().trim(); 
    let rightNow = hours;
    localStorage.setItem(rightNow, hourlyEvent);
};
$(document).on("click", ".saveBtn", function (e){
    e.preventDefault();
    let currentTime = $(this).prev().attr("id");
    storeEvents(currentTime);
});
displayDailyPlanner();
changeColors()
setInterval(changeColors, 60000);