//Clock Object
var displayData = {
    localDate: Date.now(),
    serverDate: new Date(),
    utcDate: Date.UTC(),
    utcOffset: 0,
    timeZoneAbbr: "UTC",
    timeZoneName: "Universal Time Coordinated",
    runClocksTogether: function () {
        const LOCALHOURHAND = document.querySelector("#local-hour");
        const SERVERHOURHAND = document.querySelector("#server-hour");
        const UTCHOURHAND = document.querySelector("#utc-hour");

        const LOCALMINUTEHAND = document.querySelector("#local-minute");
        const SERVERMINUTEHAND = document.querySelector("#server-minute");
        const UTCMINUTEHAND = document.querySelector("#utc-minute");

        const LOCALSECONDHAND = document.querySelector("#local-second");
        const SERVERSECONDHAND = document.querySelector("#server-second");
        const UTCSECONDHAND = document.querySelector("#utc-second");

        let localhr = this.localDate.getHours();
        let serverhr = this.serverDate.getHours();
        let utchr = this.utcDate.getHours();

        let localmin = this.localDate.getMinutes();
        let servermin = this.serverDate.getMinutes();
        let utcmin = this.utcDate.getMinutes();

        let localsec = this.localDate.getSeconds();
        let serversec = this.serverDate.getSeconds();
        let utcsec = this.utcDate.getSeconds();

        let localhrPosition = (localhr * 360 / 12) + (localmin * (360 / 60) / 12);
        let serverhrPosition = (serverhr * 360 / 12) + (servermin * (360 / 60) / 12);
        let utchrPosition = (utchr * 360 / 12) + (utcmin * (360 / 60) / 12);

        let localminPosition = (localmin * 360 / 60) + (localsec * (360 / 60) / 60);
        let serverminPosition = (servermin * 360 / 60) + (serversec * (360 / 60) / 60);
        let utcminPosition = (utcmin * 360 / 60) + (utcsec * (360 / 60) / 60);

        let localsecPosition = localsec * 360 / 60;
        let serversecPosition = serversec * 360 / 60;
        let utcsecPosition = utcsec * 360 / 60;

        localhrPosition = localhrPosition + (3 / 360);
        serverhrPosition = serverhrPosition + (3 / 360);
        utchrPosition = utchrPosition + (3 / 360);

        localminPosition = localminPosition + (6 / 60);
        serverminPosition = serverminPosition + (6 / 60);
        utcminPosition = utcminPosition + (6 / 60);

        localsecPosition = localsecPosition + 6;
        serversecPosition = serversecPosition + 6;
        utcsecPosition = utcsecPosition + 6;

        LOCALHOURHAND.style.transform = "rotate(" + localhrPosition + "deg)";
        SERVERHOURHAND.style.transform = "rotate(" + serverhrPosition + "deg)";
        UTCHOURHAND.style.transform = "rotate(" + utchrPosition + "deg)";

        LOCALMINUTEHAND.style.transform = "rotate(" + localminPosition + "deg)";
        SERVERMINUTEHAND.style.transform = "rotate(" + serverminPosition + "deg)";
        UTCMINUTEHAND.style.transform = "rotate(" + utcminPosition + "deg)";

        LOCALSECONDHAND.style.transform = "rotate(" + localsecPosition + "deg)";
        SERVERSECONDHAND.style.transform = "rotate(" + serversecPosition + "deg)";
        UTCSECONDHAND.style.transform = "rotate(" + utcsecPosition + "deg)";
    },
    runClocksSeparate: function () {
        var numOfClocks = 3;
        
        for (var i = numOfClocks; i > 0; i--) {
            var idSelector = "#";
            switch (i) {
                case 1:
                    idHourSelector = idSelector + "local-hour";
                    idMinuteSelector = idSelector + "local-minute";
                    idSecondSelector = idSelector + "local-second";

                    let hr = this.localDate.getHours();
                    let min = this.localDate.getMinutes();
                    let sec = this.localDate.getSeconds();
                    break;
                case 2:
                    idHourSelector = idSelector + "server-hour";
                    idMinuteSelector = idSelector + "server-minute";
                    idSecondSelector = idSelector + "server-second";

                    let hr = this.serverDate.getHours();
                    let min = this.serverDate.getMinutes();
                    let sec = this.serverDate.getSeconds();
                    break;
                case 3:
                    idHourSelector = idSelector + "utc-hour";
                    idMinuteSelector = idSelector + "utc-minute";
                    idSecondSelector = idSelector + "utc-second";

                    let hr = this.utcDate.getHours();
                    let min = this.utcDate.getMinutes();
                    let sec = this.utcDate.getSeconds();
                    break;
            }
            const HOURHAND = document.querySelector(idHourSelector);
            const MINUTEHAND = document.querySelector(idMinuteSelector);
            const SECONDHAND = document.querySelector(idSecondSelector);

            let hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
            let minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
            let secPosition = sec * 360 / 60;

            hrPosition = hrPosition + (3 / 360);
            minPosition = minPosition + (6 / 60);
            secPosition = secPosition + 6;

            HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
            MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
            SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    displayData.runClocksTogether();
});

function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            responseData = JSON.parse(this.responseText);

            console.log(responseData.toString());
        }
    };
    xhttp.open("GET", "http://localhost:5000/api/CurrentTime/GetCurrentTime", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        "month": displayData.localDate.getMonth(),
        "day": displayData.localDate.getDate(),
        "year": displayData.localDate.getYear(),
        "hours": displayData.localDate.getHours(),
        "minutes": displayData.localDate.getMinutes(),
        "seconds": displayData.localDate.getSeconds()
    }));
}