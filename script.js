// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    function updateTime(){
        var currentHour = dayjs().hour(); // Setting the current time using day.js .hour element

        $('.time-block').each(function(){
            var blockHour = parseInt($(this).attr('id').replace('hour-', ''), 10);

            if (blockHour < currentHour){
                $(this).removeClass('future present').addClass('past'); // If the hour entered if less than the current hour, it is considered in the past
            } else if (blockHour === currentHour){
                $(this).removeClass('future past').addClass('present'); // If the entered hour is the same as the current hour, it is considered in the present
            } else {
                $(this).removeClass('past present').addClass('future'); // If it is more than the current time, it is considered the future.
            }
        });
    }

    updateTime();

    setInterval(updateTime, 6000); // Updating the time every minute

    $('.saveBtn').on('click', function (){
        var description = $(this).siblings('.description').val();
        var timeBlock = $(this).parent().attr('id');

        localStorage.setItem(timeBlock, description); // Saving the information user provided to local storage

        alert('Your changes have been saved.'); // Notifying the user when their changes have been saved.
    });
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  });
  