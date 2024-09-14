import { i18n } from "@/assets/plugins/i18n";

export class InputImageValidator {
    private static readonly MAX_SIZE = 1024 * 1024;
    private static readonly ALLOWED_TYPES = [
        'image/png', 
        'image/jpeg', 
        'image/jpg', 
        'image/gif', 
        'image/webp', 
        'image/svg+xml', 
        'image/bmp'
    ];

    static validateImageFromFile(file: File) {
        if (!file) {
            return { isValid: false, message: i18n.t('inputs.fileUncorrect') };
        }

        if (!this.ALLOWED_TYPES.includes(file.type)) {
            return { isValid: false, message: i18n.t('inputs.images.wrongFormat') };
        }

        if (file.size > this.MAX_SIZE) {
            return { isValid: false, message: i18n.t('inputs.images.wrongSize') };
        }

        return { isValid: true, message: '' };
    }
}
