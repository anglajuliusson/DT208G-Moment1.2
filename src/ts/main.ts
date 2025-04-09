// Interface som definierar strukturen för en kurs 
interface CourseInfo { 
    code: string; 
    name: string; 
    progression: 'A'| 'B'| 'C'; // Begränsad till 'A', 'B' eller 'C' 
    syllabus: string; 
} 
console.log("Hello från watch!");