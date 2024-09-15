// 슬라이드 쇼 기능
let slideIndex = 0;
const slides = document.querySelectorAll(".slides");

if (slides.length > 0) {
    slides[0].classList.add("active");

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        slideIndex++;
        if (slideIndex >= slides.length) { slideIndex = 0; }
        slides[slideIndex].classList.add("active");
        setTimeout(showSlides, 3000); // 3초마다 슬라이드 전환
    }

    showSlides();
}

// 휠 스크롤로 페이지 이동
window.addEventListener("wheel", function(event) {
    const delta = event.deltaY || event.wheelDelta;
    if (delta) {
        window.scrollBy({
            top: delta,
            behavior: 'auto'
        });
    }
});

// 모달 관련 코드
document.addEventListener('DOMContentLoaded', () => {
    const movieModal = document.getElementById('movie-modal');
    const closeMovieBtn = document.querySelector('.close');

    if (movieModal && closeMovieBtn) {
        // 모달 닫기 버튼 클릭 시 모달 닫기
        closeMovieBtn.addEventListener('click', () => {
            movieModal.style.display = 'none';
            const trailerElement = document.getElementById('movie-trailer');
            if (trailerElement) trailerElement.src = ''; // 비디오 멈춤
        });

        // 모달 열기 이벤트 (예: 포스터 클릭 시)
        const posterElements = document.querySelectorAll('.movie-item');
        if (posterElements.length > 0) {
            posterElements.forEach((poster) => {
                poster.addEventListener('click', () => {
                    movieModal.style.display = 'block';
                    movieModal.style.position = 'fixed';
                    movieModal.style.top = '50%';
                    movieModal.style.left = '50%';
                    movieModal.style.transform = 'translate(-50%, -50%)';
                    movieModal.style.width = '660px';
                    movieModal.style.height = '750px';
                    movieModal.style.zIndex = '1000'; // 다른 요소들 위에 표시
                    movieModal.style.backgroundColor = '#2a2c30'; // 모달 배경색
                });
            });
        }
    }

    // 로그인 상태 확인 후 로그인 모달 표시
    const token = localStorage.getItem('token');
    const loginModal = document.getElementById('login-modal');
    
    if (!token && loginModal) {
        loginModal.style.display = 'block';
    } else {
        if (typeof fetchMovies === 'function') {
            fetchMovies();
        }
        if (loginModal) {
            loginModal.style.display = 'none';
        }
    }

    // 로그인 처리
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('로그인 요청이 실패했습니다.');
                }
                return res.json();
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    if (loginModal) {
                        loginModal.style.display = 'none';
                    }
                    if (typeof fetchMovies === 'function') {
                        fetchMovies();
                    }
                } else {
                    alert('로그인 실패');
                }
            })
            .catch(err => {
                console.error("로그인 요청 중 오류 발생:", err);
                alert(`로그인에 실패했습니다. 오류: ${err.message}`);
            });
        });
    }

    // 로그아웃 후 페이지 리다이렉트
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');  // JWT 토큰 삭제
            localStorage.removeItem('token_expiration');  // 만료 시간 삭제
            window.location.href = '/login';  // 로그인 페이지로 리다이렉트
        });
    }
});
