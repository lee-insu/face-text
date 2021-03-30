const URL = "https://teachablemachine.withgoogle.com/models/vDBztacir/";
    
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
            let resultTitle, resultExplain, resultCause;

        switch(prediction[0].className) {
            case "기쁨" :
            resultTitle = "행복한 레몬"
            resultExplain = "#웃음꽃 #과즙미 뿜뿜 #상큼함이 폭발 #행복전도사"
            resultCause = "명랑하고 자신감이 넘쳐있는 당신! 광대가 올라가 있고 입술 모서리는 올라가 있군요! 너무 행복하고 상큼해 보입니다. 지켜만 보고 있어도 웃음이 날 것 같은 표정이에요. 행복하면서도 들떠 있을 만큼 좋은 일이 있으셨나요? 만약 아니더라도 곧 좋은 일이 찾아올 것 같은 얼굴입니다. 주변 사람들에게 이 사진을 은근 슬쩍 보여주면 호감이 급상승 할 것 같은 예감!"
            break;

            case "까칠" :
            resultTitle = "까칠한 키위"
            resultExplain = "#시크절정 #아무도 건들지마 #도도한 매력"
            resultCause = "시크한 표정을 가지고 있는 당신! 한 쪽 얼굴이 올라가면서 입술의 끝이 당겨져있습니다. 오늘 도도하다는 말을 듣진 않았나요? 아이러니하게도 도도하고 시크한 표정을 짓고 있으면 외모가 업이 됩니다. 기분은 그렇다치고 오늘 셀카를 찍어보는 건 어떨까요? 그리고 일이나 주변 사람들 때문에 스트레스를 받고 있다면 반신욕으로 기분을 달래보는 건 어떨까요? "
            break;

            case "놀람" :
            resultTitle = "놀란 오렌지"
            resultExplain = "#리액션천국 #(ﾉ'□ﾟ) #다이나믹한 하루 #오늘 일이 많지? "
            resultCause = "놀란 표정을 가지고 있는 당신! 눈썹 높이가 올라가고 동그란 모양으로 변하며 턱이 벌어졌습니다. 오늘 무슨 일이 그렇게 많았길래 놀란 표정을 하고 있나요? 아니면 컨셉으로 놀란 모습을?? 오늘이 다이나믹한 하루였다면 집에서 치킨 시켜놓고 잔잔한 영화를 보면서 힐링하는 건 어떨까요?"
            break;

            case "분노" :
            resultTitle = "짜증난 딸기"
            resultExplain = "#건들기만 해봐 #폭발한다!!!! #다 죽는다!!!!!!!!"
            resultCause = "분노한 표정을 가지고 있는 당신.. 눈썹 높이가 낮고 아랫눈꺼풀이 팽팽하며 시선이 확고할수록 화난 것 처럼 보입니다. 오늘 누가 당신을 그렇게 짜증나게 만들었나요? 딱 데려오세요! 화가 나는 만큼 에너지를 쓰는 것도 좋아요! 달리기나 스포츠 같은 활동적인 활동으로 스트레스를 푸는 건 어떨까요? 스트레스를 풀수록 표정도 밝아진답니다."
            break;

            case "소심" :
            resultTitle = "소심한 포도"
            resultExplain = "#이거 뭐지..? #뭘까....? #응.....? #으잉....?"
            resultCause = "소심한 표정을 가지고 있는 당신! 눈썹 높이가 높아지고 입술이 가늘어졌군요. 나도 모르게 의기소침해지지 않나요? 평소와 다르게 괜히 말도 조심하게 되고 음추러 들진 않나요? 그렇다면 코인 노래방에서 노래 한 곡 뽑는 건 어떤가요?"
            break;

            case "슬픔" :
            resultTitle = "슬픈 블루베리"
            resultExplain = "#나는 아무 생각이 없다 #왜냐면 아무 생각이 없기 때문이다" 
            resultCause = "무표정 또는 슬픈 표정을 가지고 있는 당신! 눈 바깥쪽이 아래로 비스듬이 기울어졌군요. 오늘은 크게 즐겁지도 그렇다고 나쁘지도 않은 하루를 보냈나요? 미지근한 물이 잔잔하게 흐르듯 평범한 표정이지만 가장 일상적이고 보람찬 표정입니다. 아니면 도도한 표정 컨셉으로 찍은 사진일수도 있구요. 만약 슬픈 일이 있었나요? 걱정마세요. 다 잘 풀릴 겁니다! 그러니 집에서 반신욕으로 스트레스를 날려버려요. "
            break;

            default:
             resultTitle = "존재하지 않음"
             resultExplain = "존재하지 않음"
             resultCause = "존재하지 않은 건 흔치 않은데...? 다른 사진으로 도전 해보세요!"
             break;
        }
        console.log(prediction)
        let title = `<div class= '${prediction[0].className}-feeling-title'> ${resultTitle}</div>`;
        let explain = `<div class='${prediction[0].className}-explain'> ${resultExplain}</div>`;
        let cause = `<div class ='${prediction[0].className}-cause'> ${resultCause}</dlv>`;
        
        
        $('.push-result').html(title + explain + cause);
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
                case "기쁨":
                labelTitle = "기쁨"
                break;

                case "까칠":
                labelTitle = "까칠"
                break;

                case "놀람":
                labelTitle = "놀람"
                break;

                case "분노":
                labelTitle = "분노"
                break;

                case "소심":
                labelTitle = "소심"
                break;

                case "슬픔":
                labelTitle = "슬픔"
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