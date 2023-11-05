// Commonly used elements 
var currentDay = $('#currentDay');
var currentTime = $('#currentTime');
var timeBlock = $('.time-block');

$(function () {

    // Formatting the date and time at the top of the page
    function updateTime(){
        var date = dayjs().format('dddd, MMMM D, YYYY');
        var time = dayjs().format('h:mm A');

        currentDay.text(date);
        currentTime.text(time);


        var currentHour = dayjs().hour(); // Setting the current time using day.js .hour element

        $(this).removeClass('past present future'); // Removing any previous classes that may be there

        timeBlock.each(function(){
            var blockHour = parseInt($(this).attr('id').replace('hour-', ''), 10);
            if (blockHour < currentHour){
                $(this).addClass('past'); // If the hour entered if less than the current hour, it is considered in the past
            } else if (blockHour === currentHour){
                $(this).addClass('present'); // If the entered hour is the same as the current hour, it is considered in the present
            } else {
                $(this).addClass('future'); // If it is more than the current time, it is considered the future.
            }
        });
    }

    // This function applies every time the page is loaded
    $(document).ready(function(){
        var date = dayjs().format('dddd, MMMM D, YYYY');
        currentDay.text(date);

        updateTime();

        setInterval(updateTime, 60000); // Updating every minute
    });

    $('.saveBtn').on('click', function (){
        var description = $(this).siblings('.description').val();
        var timeBlock = $(this).parent().attr('id');

        localStorage.setItem(timeBlock, description); // Saving the information user provided to local storage

        alert('Your changes have been saved.'); // Notifying the user when their changes have been saved.
    });

    // The following function is to keep the users data persistent even upon the page being reloaded
    timeBlock.each(function(){
        var timeBlock = $(this).attr('id');
        var savedDescription = localStorage.getItem(timeBlock);
        if (savedDescription){
            $(this).find('.description').val(savedDescription);
        }
    });

});
  