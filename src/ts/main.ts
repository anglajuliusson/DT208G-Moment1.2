// Interface som definierar strukturen för en kurs 
interface CourseInfo { 
    code: string; 
    name: string; 
    progression: 'A'| 'B'| 'C'; // Begränsad till 'A', 'B' eller 'C' 
    syllabus: string; 
} 
console.log("Test");

class CourseManager {
    private courses: CourseInfo[] = [];

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
            typeof course.name === 'string' &&  // Kontrollera om det är 'name' eller 'coursename'
            this.isValidProgression(course.progression) &&
            typeof course.syllabus === 'string';
    }

    // Kontrollera progression
    private isValidProgression(value: string): value is 'A' | 'B' | 'C' {
        return value === 'A' || value === 'B' || value === 'C';
    }
}

// Skapa en instans av CourseManager och ladda kurser vid sidladdning
window.addEventListener("load", async () => {
    const courseManager = new CourseManager();
    await courseManager.loadAndSaveCourses();
});