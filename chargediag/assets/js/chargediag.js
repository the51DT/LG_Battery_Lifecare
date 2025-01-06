document.addEventListener("DOMContentLoaded", () => {
  // 숫자 데이터 말풍선에 넣기
  const gageValue = document.querySelector(".chargediag_battery_num").innerText;
  const gagePos = document.querySelector(".chargediag_battery_pos");

  gagePos.innerText = gageValue;

  // 관리필요, 보통, 우수 기준숫자 넘어갔는지 확인 후 색 변경
  const gageWrap = document.querySelector(".chargediag_battery_box");
  const gageValueNum = Number(gageValue);
  const badNum = 92.57; // 관리필요 - 보통 기준숫자
  const goodNum = 97.8; // 보통 - 우수 기준숫자

  if (gageValueNum <= badNum) {
    gageWrap.classList.add("bad");
    if (gageWrap.classList.contains("good")) {
      gageWrap.classList.remove("good");
    }
  } else if (gageValueNum > goodNum) {
    gageWrap.classList.add("good");
    if (gageWrap.classList.contains("bad")) {
      gageWrap.classList.remove("bad");
    }
  } else {
    if (gageWrap.classList.contains("bad")) {
      gageWrap.classList.remove("bad");
    }
    if (gageWrap.classList.contains("good")) {
      gageWrap.classList.remove("good");
    }
  }

  // 게이지 최소&최대값에서 gageValue 퍼센트값
  const min = 0;
  const max = 100;

  const gagePer = (((gageValue - min) / (max - min)) * 100).toFixed(2);

  // 말풍선 위치 조절
  gagePos.style.left = `${gagePer}%`;

  // 기기 사이즈에 맞춰서 스케일조정
  function calculateScale(
    originalWidth,
    originalHeight,
    targetWidth,
    targetHeight
  ) {
    let scaleX = targetWidth / originalWidth;
    let scaleY = targetHeight / originalHeight;
    return Math.min(scaleX, scaleY);
  }

  let container = document.querySelector(".chargediag_wrap");
  let content = document.querySelector(".chargediag_area");

  let containerWidth = container.offsetWidth;
  let containerHeight = container.offsetHeight;

  let originalWidth = content.offsetWidth;
  let originalHeight = content.offsetHeight;

  let scale = calculateScale(
    originalWidth,
    originalHeight,
    containerWidth,
    containerHeight
  );

  content.style.transform = `translate(-50%, -50%) scale(${scale})`;
  let resultHeight = originalHeight * scale;
  container.style.height = `${resultHeight}px`
})