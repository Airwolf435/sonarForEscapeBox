radio.onReceivedString(function (receivedString) {
    if (receivedString == "D") {
        systemArmed = 0
    }
})
let detectCounter = 0
let currentDistance = 0
let systemArmed = 0
basic.pause(200)
let maxDistance = sonar.ping(
DigitalPin.P0,
DigitalPin.P2,
PingUnit.Centimeters
)
systemArmed = 1
radio.setGroup(199)
basic.forever(function () {
    currentDistance = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P2,
    PingUnit.Centimeters
    )
    if (currentDistance < maxDistance) {
        detectCounter += 1
    } else {
        detectCounter = 0
    }
    if (detectCounter >= 3 && systemArmed) {
        radio.sendString("B")
        basic.showIcon(IconNames.Ghost)
        detectCounter = 0
    } else if (systemArmed == 0) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
    basic.pause(30)
})
