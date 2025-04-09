var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
console.log("Test");
var CourseManager = /** @class */ (function () {
    function CourseManager() {
        this.courses = [];
    }
    // Funktion för att ladda kursdata från JSON och spara till localStorage
    CourseManager.prototype.loadAndSaveCourses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, parsedCourses, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json')];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Misslyckades med att hämta kursdata');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        parsedCourses = _a.sent();
                        console.log(parsedCourses); // Logga den hämtade JSON-datan
                        // Kontrollera att kursdata är i rätt format
                        if (Array.isArray(parsedCourses) && parsedCourses.every(function (course) { return _this.isValidCourse(course); })) {
                            this.courses = parsedCourses;
                            // Spara kurser till localStorage
                            localStorage.setItem('courses', JSON.stringify(this.courses));
                            console.log("Kursdata sparades till localStorage");
                        }
                        else {
                            console.error("Felaktig kursdata i JSON-filen");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Fel vid hämtning av kursdata", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Funktion för att validera kursobjekt
    CourseManager.prototype.isValidCourse = function (course) {
        console.log(course); // Logga varje kursobjekt för att undersöka
        return typeof course.code === 'string' &&
            typeof course.name === 'string' && // Kontrollera om det är 'name' eller 'coursename'
            this.isValidProgression(course.progression) &&
            typeof course.syllabus === 'string';
    };
    // Kontrollera progression
    CourseManager.prototype.isValidProgression = function (value) {
        return value === 'A' || value === 'B' || value === 'C';
    };
    return CourseManager;
}());
// Skapa en instans av CourseManager och ladda kurser vid sidladdning
window.addEventListener("load", function () { return __awaiter(_this, void 0, void 0, function () {
    var courseManager;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseManager = new CourseManager();
                return [4 /*yield*/, courseManager.loadAndSaveCourses()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
