// Interface som definierar strukturen för en kurs 
interface CourseInfo { 
    code: string; 
    coursename: string; 
    progression: 'A'| 'B'| 'C'; // Begränsad till 'A', 'B' eller 'C' 
    syllabus: string; 
} 

class CourseManager {
    private courses: CourseInfo[] = [];

    private saveCoursesToLocalStorage():void {
        localStorage.setItem('courses', JSON.stringify(this.courses));
    }

    public loadCoursesFromLocalStorage(): void {
        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
            this.courses = JSON.parse(storedCourses);
            this.renderCourses();
        }
    }    

    // Funktion för att ladda kursdata från JSON och spara till localStorage
    async loadAndSaveCourses(): Promise<void> {
        try {
            // Försök att hämta kursdata från den externa JSON-filen
            const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json'); // Hämta extern json-fil
            if (!response.ok) {
                throw new Error('Misslyckades med att hämta kursdata');
            }

            // Parsar JSON-svaret till en lista av kursobjekt
            const parsedCourses = await response.json() as CourseInfo[];
            console.log(parsedCourses); // Logga den hämtade JSON-datan

            // Kontrollera att kursdata är i rätt format
            if (Array.isArray(parsedCourses) && parsedCourses.every(course => this.isValidCourse(course))) {
                this.courses = parsedCourses;

                // Spara kurser till localStorage
                localStorage.setItem('courses', JSON.stringify(this.courses));
                console.log("Kursdata sparades till localStorage");
                this.renderCourses(); // Uppdatera tabellen med de nya kurserna
            } else {
                console.error("Felaktig kursdata i JSON-filen");
            }
        } catch (error) {
            console.error("Fel vid hämtning av kursdata", error);
        }
    }

    // Funktion för att validera kursobjekt
    private isValidCourse(course: any): course is CourseInfo {
        console.log(course);  // Logga varje kursobjekt för att undersöka
        return typeof course.code === 'string' &&
            typeof course.coursename === 'string' &&  // Kontrollera om det är 'name' eller 'coursename'
            this.isValidProgression(course.progression) &&
            typeof course.syllabus === 'string';
    }

    // Kontrollera progression
    private isValidProgression(value: string): value is 'A' | 'B' | 'C' {
        return value === 'A' || value === 'B' || value === 'C';
    }

    // Skriv ut kursinformation i tabellen
    private renderCourses(): void {
        const courseTable = document.querySelector('.coursetable') as HTMLTableSectionElement;
        courseTable.innerHTML = '';

        this.courses.forEach(course => {
        const row = courseTable.insertRow();
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
            <td><a href=${course.syllabus}>${course.syllabus}</a></td>
        `;
        });
    }; 

    // Funktion för att lägga till ny kurs 
    private addCourse(course: CourseInfo): void { 
        if (!this.isValidCourse(course)) { 
            alert('Ogiltig kursinformation. Vänligen kontrolera dina inmatningar'); 
        return; 
        } 
    
    // Kontrollera om kursen redan finns 
    if (this.courses.some((c) => c.code === course.code)) { 
        alert('En kurs med denna kurskod finns redan'); 
    return; 
    } 
    
    this.courses.push(course); // Lägg till den nya kursen i arrayen 
    
    this.saveCoursesToLocalStorage(); // Spara den uppdaterade kurslistan till localStorage 
    this.renderCourses(); // Uppdatera tabellen med den nya kursen 
    } 
    
    // Funktion för att sätta upp eventlyssnare för formuläret 
    public setupEventListener(): void { 
        const form = document.querySelector('.courseform') as HTMLFormElement; 
        form.addEventListener('submit', (event) => { 
        event.preventDefault(); // Förhindra standardbeteende för formuläret 
    
    // Hämta värden från formuläret 
    const code = (document.querySelector('.form_code') as HTMLInputElement).value.trim(); 
    const coursename = (document.querySelector('.form_coursename') as HTMLInputElement).value.trim(); 
    const progression = (document.querySelector('.form_progression') as HTMLSelectElement).value as 'A'|'B'|'C'; 
    const syllabus = (document.querySelector('.form_syllabus') as HTMLInputElement).value.trim(); 

    // Skapa nytt kursobjekt 
    const newCourse: CourseInfo = {code, coursename, progression, syllabus}; 
        this.addCourse(newCourse); // Lägg till den nya kursen 
        form.reset(); // Återställ formuläret efter inmatninng 
    }) 
    }};
     
// Skapa en instans av CourseManager och ladda kurser vid sidladdning
window.addEventListener("load", async () => {
    const courseManager = new CourseManager();
    courseManager.setupEventListener();

    // Ladda kurserna från localstore
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
        courseManager.loadCoursesFromLocalStorage();
    } else {
    await courseManager.loadAndSaveCourses();
    }
});