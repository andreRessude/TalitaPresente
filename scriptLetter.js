document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    // console.log(studentId)
    if (studentId) {
        fetchStudentData(studentId);
    } else {
        document.getElementById('student-name').textContent = 'Student Not Found';
    }
});

function fetchStudentData(student){
    fetch("students.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON.')
        }
        return response.json();
    })
    .then(data => {
        const studentInfo = data.students[student-1]
        buildLetter(studentInfo)
        // console.log(studentInfo)
        // console.log(data.students[student-1])
    })
    .catch(error => {
        console.error('Error:', error);
    })
}

function buildLetter(studentInfo){
    document.getElementById("student-letter-title").textContent = studentInfo.title;
    document.getElementById("student-name").textContent = studentInfo.name;
    document.getElementById("student-letter").textContent = studentInfo.letter;
    loadGallery(studentInfo.id ,studentInfo.nImages);
}

function loadGallery(id, num) {
    const gallery = document.getElementById('gallery');
    const src = `./images/pictures/student${id}/`
    for (let i = 0; i < num; i++){
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = src+`pic${i+1}.png`;
        img.alt = `Gallery Image ${i+1}`;
        item.appendChild(img);
        gallery.appendChild(item);
    }
}