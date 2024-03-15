export enum avaibleLanguages {
    PL = "PL-pl",
    ENG = "ENG-en"
}

type ITranslations = {
    translationName: string;
    translationPL: string;
    translationENG: string;
}

export class TranslateUtils {
    private currentLanguage = avaibleLanguages.PL;
    
    public Translate(translationName: string): string {
        let translatedText: ITranslations | null = null; 

        for (let translation of this.translationsManagment) {
            if (translation.translationName === translationName) {
                translatedText = translation;
                break;
            }
        }

        if (translatedText != null) {
            if (this.currentLanguage === avaibleLanguages.PL) {
                return this.replaceBlackChars(translatedText.translationPL);
            } else {
                return this.replaceBlackChars(translatedText.translationENG);
            }
        } else {
            return this.replaceBlackChars(translationName);
        }
    }

    public SetLanguage(language: avaibleLanguages) {
        this.currentLanguage = language;
        // Refresh all texts on the application and change to the current language
        for (let translation of this.translationsManagment) {
            const translatedText = this.Translate(translation.translationName);
            const elements = document.querySelectorAll(`#${translation.translationName}`);
            elements.forEach((element) => {
                element.innerHTML = translatedText;
            });
        }
    }

    public GetLanguage() {
        return this.currentLanguage;
    }

    private translationsManagment: Array<ITranslations> = [
        {
            translationName: "stdhometitle",
            translationPL: "Moje Biuro Rachunkowe",
            translationENG: "My Accounting Office"
        },
        {
            translationName: "stdhomesubtitle",
            translationPL: "Usługi Rachunkowe",
            translationENG: "Accounting Services"
        },
        {
            translationName: "stdhomecontent",
            translationPL: "Oferujemy szeroki zakres usług rachunkowych, które pomogą Ci zarządzać swoją firmą. Nasze usługi obejmują prowadzenie ksiąg rachunkowych, obsługę płac, przygotowywanie deklaracji podatkowych i wiele innych. Jesteśmy zobowiązani do świadczenia najwyższego poziomu obsługi i ekspertyzy. Pozwól nam zająć się Twoimi potrzebami rachunkowymi, abyś mógł skupić się na prowadzeniu swojej firmy.",
            translationENG: "We provide a wide range of accounting services to help you manage your business. Our services include bookkeeping, payroll, tax preparation, and more. We are committed to providing you with the highest level of service and expertise. Let us take care of your accounting needs so you can focus on running your business."
        }
    ]

    public replaceBlackChars(inputString: string): string {
        // Define a list of blacklisted characters
        const blacklistedChars = ['<', '>', '&', ';', '=', '+', '#', '%'];
    
        // Replace blacklisted characters with safe alternatives
        const safeString = inputString.replace(
            new RegExp(`[${blacklistedChars.join('')}]`, 'g'),
            (match) => {
                // Replace each blacklisted character with a safe alternative
                switch (match) {
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    case '&':
                        return '&amp;';
                    case ';':
                        return '&#59;';
                    case '=':
                        return '&#61;';
                    case '+':
                        return '&#43;';
                    case '#':
                        return '&#35;';
                    case '%':
                        return '&#37;';
                    default:
                        return match; // If the character is not blacklisted, keep it unchanged
                }
            }
        );
    
        return safeString;
    }
}