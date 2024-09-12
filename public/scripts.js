// 슬라이드 쇼 기능
let slideIndex = 0;
const slides = document.querySelectorAll(".slides");
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

// 휠 스크롤로 페이지 이동
window.addEventListener("wheel", function(event) {
    const delta = event.deltaY || event.wheelDelta;
    if (delta) {
        window.scrollBy({
            top: delta,
            behavior: 'smooth'  // 부드러운 스크롤
        });
    }
});

// 모달 관련 코드
document.addEventListener('DOMContentLoaded', () => {
    const movieModal = document.getElementById('movie-modal');
    const closeMovieBtn = document.querySelector('.close');
    closeMovieBtn.addEventListener('click', closeMovieModal);

    function closeMovieModal() {
        movieModal.style.display = 'none';
        document.getElementById('movie-trailer').src = '';
    }

    // 로그인 상태 확인 후 로그인 모달 표시
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('login-modal').style.display = 'block'; // 로그인 모달 표시
    } else {
        fetchMovies(); // 로그인 상태면 영화 목록 로드
        document.getElementById('login-modal').style.display = 'none'; // 로그인 모달 숨김
    }

    // 영화 데이터를 가져와서 페이지에 표시하는 함수
    fetchMovies();

    // 로그인 처리
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                document.getElementById('login-modal').style.display = 'none'; // 로그인 모달 닫기
                fetchMovies(); // 영화 목록 불러오기
            } else {
                alert('로그인 실패');
            }
        });
    });

    // 회원가입 처리
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const name = document.getElementById('signup-name').value;

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'User signed up successfully') {
                alert('회원가입이 완료되었습니다.');
                document.getElementById('signup-modal').style.display = 'none';
            } else {
                alert('회원가입 실패');
            }
        });
    });

    // 로그아웃 처리
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('로그아웃되었습니다.');
        location.reload();
    });

    // 로그인 상태 확인 후 닉네임 출력
    if (token) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(user => {
            document.getElementById('username').textContent = user.name;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('user-name').textContent = user.name;
        });
    }

    // 프로필 모달 열기
    const profileTab = document.getElementById('profile-tab');
    profileTab.addEventListener('click', () => {
        if (token) {
            document.getElementById('profile-modal').style.display = 'block';
        } else {
            document.getElementById('login-modal').style.display = 'block';
        }
    });

    // 내 정보 클릭 시 정보 표시
    document.getElementById('user-info').addEventListener('click', () => {
        document.getElementById('user-info-section').style.display = 'block';
        document.getElementById('favorites-section').style.display = 'none';
    });

    // 찜한 목록 클릭 시 찜한 영화 표시
    document.getElementById('favorites-btn').addEventListener('click', () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movies/favorites`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(movies => {
            const favoritesGrid = document.getElementById('favorites-grid');
            favoritesGrid.innerHTML = '';
            movies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('movie-item');
                const img = document.createElement('img');
                img.src = movie.poster_url;
                img.alt = movie.title;
                const title = document.createElement('p');
                title.textContent = movie.title;
                movieItem.appendChild(img);
                movieItem.appendChild(title);
                favoritesGrid.appendChild(movieItem);
            });
        });
        document.getElementById('user-info-section').style.display = 'none';
        document.getElementById('favorites-section').style.display = 'block';
    });

    // 창 외부 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
        const profileModal = document.getElementById('profile-modal');
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
});
