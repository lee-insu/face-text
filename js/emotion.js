const URL = "https://teachablemachine.withgoogle.com/models/nniImvUA2/";
    
        let model, webcam, labelContainer, maxPredictions;
    
        // Load the image model and setup the webcam
        async function init() {    
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
    
            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // or files from your local hard drive
            // Note: the pose library adds "tmImage" object to your window (window.tmImage)
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            labelContainer = document.getElementById("label-container");
            for (let i = 0; i < maxPredictions; i++) { // and class labels
                let element = document.createElement("div")
                element.classList.add("feel-list");
                labelContainer.appendChild(element);
            }
        }
    
        // run the webcam image through the image model
        async function predict() {
            // predict can take in an image, video or canvas html element
            let image = document.querySelector("#face-image")
            const prediction = await model.predict(image, false);
            prediction.sort((a,b) => parseFloat(b.probability) - parseFloat(a.probability));
            let resultImage, resultTitle, resultExplain, resultCause;

        switch(prediction[0].className) {
            case "최준" :
            resultImage = "../static/img/최준.png"
            resultTitle = "최준"
            resultExplain = "음머~~~ 나한테 반해버린고양~~"
            resultCause = "당신의 천생연분 짝은 최준입니다. 이미 준며든 당신에게 벗어날 곳은 없습니다. 아! 제발 여기서 꺼내주십시오! 준며들어서 여기를 벗어날 수 없습니다. 유일한 해결책은 그에게 뽀뽀하는 겁니다"
            break;

            case "차진석" :
            resultImage = "../static/img/차진석.png"
            resultTitle = "차진석"
            resultExplain = "츠읍! 어 비타500 드릴까?"
            resultCause = "당신의 천생연분 짝은 차진석입니다. 그의 남자다움에 당신은 비타 500을 가득 채운 것 같은 기분이 듭니다. 물론 그의 마음엔 몇 명의 여자가 있는지 모르겠지만 당신을 만날 때만큼은 잘해줄겁니다.  "
            break;

            case "방재호" :
            resultImage = "../static/img/방재호.png"
            resultTitle = "방재호"
            resultExplain = "🙏자기 긍정의 법칙🙏 "
            resultCause = "당신의 천생연분 짝은 방재호입니다. 젠틀해 보이고 친절하며 매번 깔끔한 모습에 완벽 그 자체로 느껴집니다. 하지만 왜 일까요? 더 알아갈수록 내 통장이 비어가는 이유는.."
            break;

            case "임플란트키드" :
            resultImage = "../static/img/임플란트키드.png"
            resultTitle = "임플란트키드"
            resultExplain = "아 쒸x 킹 받네!!"
            resultCause = "당신의 이빨까지 어울리는 짝은 임플란트키드입니다. 그의 거친 입에 한 대 때리고 싶지만 귀여운 외모 덕분에 당신은 '훗..뭐야 ㅎ' 하면서 점점 빠져듭니다. 어쩌면 그의 욕 한마디에 반해 기절할지도 모릅니다."
            break;

            case "이호창" :
            resultImage = "../static/img/이호창.png"
            resultTitle = "이호창"
            resultExplain = "김갑생할머니김 가족 여러분 모두 안녕하십니까?"
            resultCause = "당신의 천생연분 짝은 이호창입니다. 한국의 일론머스크라 불리는 이호창은 김나박이부터 우주선이라는 미래를 보여줍니다. 그의 진취적이고 프로페셔널함에 당신은 빠져듭니다. 하지만 조심하십시오. 그의 비전과 함께할 수 없다면 당신은 그와 같이할 수 없습니다.  "
            break;


            default:
             resultTitle = "존재하지 않음"
             resultExplain = "존재하지 않음"
             resultCause = "존재하지 않은 건 흔치 않은데...? 다른 사진으로 도전 해보세요!"
             break;
        }
        console.log(prediction)
        let faceImage = `<div class='be-face-image'><img src ='${resultImage}'></div>`
        let title = `<div class= '${prediction[0].className}-feeling-title'> ${resultTitle}</div>`;
        let explain = `<div class='${prediction[0].className}-explain'> ${resultExplain}</div>`;
        let cause = `<div class ='${prediction[0].className}-cause'> ${resultCause}</dlv>`;
        
        
        $('.push-result').html(faceImage + title + explain + cause);
        let barWidth;
        for (let i = 0; i < maxPredictions; i++) {
            if(prediction[i].probability.toFixed(2) > 0.1) {
                barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
            } else if (prediction[i].probability.toFixed(2) >= 0.01) {
                barWidth = "4%"
            }else {
                barWidth= "2%"
            }

            let labelTitle;
            switch (prediction[i].className) { 
                case "최준":
                labelTitle = "최준"
                break;

                case "차진석":
                labelTitle = "차진석"
                break;

                case "방재호":
                labelTitle = "방재호"
                break;

                case "임플란트키드":
                labelTitle = "임키"
                break;

                case "이호창":
                labelTitle = "이호창"
                break;

                default:
                labelTitle = "존재하지 않음"
                break;
            }
            console.log(barWidth);
            let label = `<div class ='feeling-label'> ${labelTitle} </div>`
            let bar = `<div class ='bar-container'><div class='${prediction[i].className}-box'><div class='align-center ${prediction[i].className}-bar' style='width:${barWidth}'><span class ='percent-text'>${Math.round(prediction[i].probability.toFixed(2) * 100)}%</span></div></div>`;
            labelContainer.childNodes[i].innerHTML = label + bar;

          
        }

    }