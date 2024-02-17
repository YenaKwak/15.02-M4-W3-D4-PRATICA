const url = "https://jsonplaceholder.typicode.com/users";
let currentSearchType = 'name'; // 기본 검색 유형 설정

document.querySelectorAll('.dropdown-menu a').forEach(item => {
    item.addEventListener('click', function() {
        currentSearchType = this.textContent.toLowerCase();
        let dropdownButton = document.getElementById('dropdownMenuButton');
        dropdownButton.textContent = this.textContent; // 드롭다운 버튼 텍스트 업데이트
    });
});



let allData = []; // 전체 데이터 저장

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        allData = data; // 전체 데이터 저장
        updateTable(data); // 최초 테이블 로딩
    } catch (error) {
        console.error('Error:', error);
    }
}

async function searchUsers() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = allData.filter(user => user[currentSearchType]?.toString().toLowerCase().includes(searchInput));
    updateTable(filteredData); // 테이블 업데이트
}

function updateTable(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // 기존 내용 클리어

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'mt-5'); //bootstrap

    const thead = document.createElement('thead');
    const headerRow = thead.insertRow();
    ['No.', 'Name', 'Username', 'Email'].forEach(text => {
        const headerCell = document.createElement('th');
        headerCell.textContent = text;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach((user, index) => {
        const row = tbody.insertRow();
        const numberCell = row.insertCell();
        numberCell.textContent = index + 1;
        const nameCell = row.insertCell();
        nameCell.textContent = user.name;
        const usernameCell = row.insertCell();
        usernameCell.textContent = user.username;
        const emailCell = row.insertCell();
        emailCell.textContent = user.email;
    });
    table.appendChild(tbody);

    resultsContainer.appendChild(table); // 테이블 추가
}

fetchData(url); // 페이지 로드 시 데이터 가져오기


document.getElementById('searchInput').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        searchUsers();
    }

});

