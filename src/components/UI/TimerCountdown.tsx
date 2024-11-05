"use client"
import {useEffect} from "react";

const TimerCountdown = () => {
  const timerHandler = () => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today: any = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "02/02/",
      birthday = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {

        const now = new Date().getTime(),
          distance = countDown - now;
        const elDay = document.getElementById("days");
        const elHour = document.getElementById("hours");
        const elMinutes = document.getElementById("minutes");
        const elSeconds = document.getElementById("seconds");

        if (elDay) elDay.innerText = String(Math.floor(distance / (day)))
        if (elHour) elHour.innerText = String(Math.floor((distance % (day)) / (hour)))
        if (elMinutes) elMinutes.innerText = String(Math.floor((distance % (hour)) / (minute)))
        if (elSeconds) elSeconds.innerText = String(Math.floor((distance % (minute)) / second));

        //do something later when date is reached
        if (distance < 0) {
          const elHeadline = document.getElementById("headline");
          const elCountdown = document.getElementById("countdown");
          const elContent = document.getElementById("content");
          if (elHeadline) elHeadline.innerText = "It's my birthday!";
          if (elCountdown) elCountdown.style.display = "none";
          if (elContent) elContent.style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0)
  }
  useEffect(() => {
    timerHandler()
  }, [])

  return (
    <div className="timer" id="countdown">
      <ul>
        <li><span id="days"></span><p>Days</p></li>
        <li><span id="hours"></span><p>Hours</p></li>
        <li><span id="minutes"></span><p>Minutes</p></li>
        <li><span id="seconds"></span><p>Seconds</p></li>
      </ul>
    </div>
  )
}
export default TimerCountdown;
