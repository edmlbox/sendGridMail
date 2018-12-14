var express = require("express");
var app = express();

var app = express();

app.use(express.json());

app.post("/", function(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  let body = [];
  request
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      var bodyObj = JSON.parse(body);

      SendMailBody(bodyObj);
      response.send(bodyObj);
    });

  function SendMailBody(bodyObj) {
    const sgMail = require("@sendgrid/mail");
    const SENDGRID_API_KEY =
      "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";
    sgMail.setApiKey(SENDGRID_API_KEY);

    let img_different_width = bodyObj.img.replace("500x500", "300x300");
    let svgImage =
      '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9Ii04OCAwIDUxMiA1MTIiIHdpZHRoPSI1MTJweCI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIGQ9Ik0gMzM2LjU1ODU5NCAyODguOTgwNDY5IEwgMTY4LjI4MTI1IDM1MS4zMDg1OTQgTCAwIDI4OC45ODA0NjkgTCAxNjguMjgxMjUgMCBaIE0gMzM2LjU1ODU5NCAyODguOTgwNDY5ICIgc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigxMDAlLDI5LjQxMTc2NSUsMCUpO2ZpbGwtb3BhY2l0eToxOyIvPgo8cGF0aCBkPSJNIDMyOS4yMTA5MzggMzIzLjY5OTIxOSBMIDE2OC4yODEyNSA1MTIgTCA3LjM1MTU2MiAzMjMuNjk5MjE5IEwgMTY4LjI4MTI1IDM4My4zMDA3ODEgWiBNIDMyOS4yMTA5MzggMzIzLjY5OTIxOSAiIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMTAwJSwyOS40MTE3NjUlLDAlKTtmaWxsLW9wYWNpdHk6MTsiLz4KPHBhdGggZD0iTSAxNjguMjgxMjUgMzgzLjMwMDc4MSBMIDMyOS4yMTA5MzggMzIzLjY5OTIxOSBMIDE2OC4yODEyNSA1MTIgWiBNIDE2OC4yODEyNSAzODMuMzAwNzgxICIgc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYig3Ny42NDcwNTklLDEyLjk0MTE3NiUsMCUpO2ZpbGwtb3BhY2l0eToxOyIvPgo8cGF0aCBkPSJNIDMzNi41NTg1OTQgMjg4Ljk4MDQ2OSBMIDE2OC4yODEyNSAzNTEuMzA4NTk0IEwgMTY4LjI4MTI1IDAgWiBNIDMzNi41NTg1OTQgMjg4Ljk4MDQ2OSAiIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoNzcuNjQ3MDU5JSwxMi45NDExNzYlLDAlKTtmaWxsLW9wYWNpdHk6MTsiLz4KPC9nPgo8L3N2Zz4K" />';
    const msg = {
      to: bodyObj.email,
      from: "Ethereum@ethereum.com",
      subject: "Request for payment",
      html:
        '<div style="display: inline-block; text-align:center;padding:1rem;border:5px solid gray;"><div style="display:flex;justify-content: space-between;"><span style="font-size: 2em;border-bottom: 2px solid #e91e6385;display: inline-table;">' +
        bodyObj.value1 +
        (bodyObj.value1 ? "<span style='margin-left:.5em'>USD </span>" : "") +
        '</span><span style="font-size: 2em;border-bottom: 2px solid #e91e6385;margin-left: auto;display: inline-table;">' +
        bodyObj.value2 +
        (bodyObj.value2 ? "<span style='margin-left:.5em'>ETH</span>" : "") +
        '</span></div><div style="text-align:center;margin-top: 1em;font-weight: bold;text-transform: uppercase;font-size: .87em;' +
        'letter-spacing: .011em;font-size:1.2em; color: #3F51B5;">Ethereum address to receive founds:</div><div style="background-color: #fff6aa;font-size:1.4em;padding: .5em;display: block;letter-spacing: 0.5px;border-radius: 5px;text-align: center;">' +
        bodyObj.eth +
        "</div><img src=" +
        img_different_width +
        '><div ><span style="font-size:13px; margin-top: -30px;">This QR code can be scanned to get the address</span></div></div>'
    };
    sgMail.send(msg);

    console.log(bodyObj);
  }

  // echo the result back
});

const PORT = process.env.PORT || 8030;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
