"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PassportV1_instances, _PassportV1_checklist;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportV1 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
const MRZ = __importStar(require("mrz"));
class PassportV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
        });
        _PassportV1_instances.add(this);
        /** List of first (given) names of the passport holder. */
        this.givenNames = [];
        this.country = new fields_1.TextField({
            prediction: prediction.country,
            pageId: pageId,
        });
        this.idNumber = new fields_1.TextField({
            prediction: prediction.id_number,
            pageId: pageId,
        });
        this.birthDate = new fields_1.DateField({
            prediction: prediction.birth_date,
            pageId: pageId,
        });
        this.expiryDate = new fields_1.DateField({
            prediction: prediction.expiry_date,
            pageId: pageId,
        });
        this.issuanceDate = new fields_1.DateField({
            prediction: prediction.issuance_date,
            pageId: pageId,
        });
        this.birthPlace = new fields_1.TextField({
            prediction: prediction.birth_place,
            pageId: pageId,
        });
        this.gender = new fields_1.TextField({
            prediction: prediction.gender,
            pageId: pageId,
        });
        this.surname = new fields_1.TextField({
            prediction: prediction.surname,
            pageId: pageId,
        });
        this.mrz1 = new fields_1.TextField({
            prediction: prediction.mrz1,
            pageId: pageId,
        });
        this.mrz2 = new fields_1.TextField({
            prediction: prediction.mrz2,
            pageId: pageId,
        });
        prediction.given_names.map((prediction) => this.givenNames.push(new fields_1.TextField({
            prediction: prediction,
            pageId: pageId,
        })));
        this.fullName = this.constructFullName(pageId);
        this.mrz = this.constructMRZ(pageId);
        __classPrivateFieldGet(this, _PassportV1_instances, "m", _PassportV1_checklist).call(this);
    }
    static convertMRZDateToDatetime(dateString) {
        const year = parseInt(dateString.substring(0, 2));
        const month = parseInt(dateString.substring(2, 4));
        const day = parseInt(dateString.substring(4, 6));
        // month is 0 indexed, day is 1 indexed... because JavaScript ...
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }
    toString() {
        const outStr = `----- Passport V1 -----
Filename: ${this.filename}
Full name: ${this.fullName}
Given names: ${this.givenNames.map((name) => name.value).join(" ")}
Surname: ${this.surname}
Country: ${this.country}
ID Number: ${this.idNumber}
Issuance date: ${this.issuanceDate}
Birth date: ${this.birthDate}
Expiry date: ${this.expiryDate}
MRZ 1: ${this.mrz1}
MRZ 2: ${this.mrz2}
MRZ: ${this.mrz}
----------------------
`;
        return PassportV1.cleanOutString(outStr);
    }
    isExpired() {
        const dateTime = new Date();
        if (this.expiryDate.dateObject) {
            return this.expiryDate.dateObject < dateTime;
        }
        return true;
    }
    isMRZValid(mrz) {
        const check = mrz.valid;
        if (check)
            this.mrz.confidence = 1.0;
        return check;
    }
    isBirthDateValid(mrz) {
        if (this.birthDate.dateObject === undefined || !mrz.fields.birthDate) {
            return false;
        }
        const mrzDate = PassportV1.convertMRZDateToDatetime(mrz.fields.birthDate);
        const check = fields_1.DateField.compareDates(this.birthDate.dateObject, mrzDate);
        if (check) {
            this.birthDate.confidence = 1.0;
        }
        return check;
    }
    isExpiryDateValid(mrz) {
        if (this.expiryDate.dateObject === undefined ||
            !mrz.fields.expirationDate) {
            return false;
        }
        const mrzDate = PassportV1.convertMRZDateToDatetime(mrz.fields.expirationDate);
        const check = fields_1.DateField.compareDates(this.expiryDate.dateObject, mrzDate);
        if (check) {
            this.expiryDate.confidence = 1.0;
        }
        return check;
    }
    isIdNumberValid(mrz) {
        const check = mrz.fields.documentNumber &&
            mrz.fields.documentNumber === this.idNumber.value;
        if (check)
            this.idNumber.confidence = 1.0;
        return check;
    }
    isSurnameValid(mrz) {
        const check = mrz.fields.lastName === this.surname.value;
        if (check)
            this.surname.confidence = 1.0;
        return check;
    }
    isCountryValid(mrz) {
        const check = mrz.fields.nationality === this.country.value;
        if (check)
            this.country.confidence = 1.0;
        return check;
    }
    constructFullName(pageNumber) {
        if (this.surname &&
            this.givenNames.length > 0 &&
            this.givenNames[0].value) {
            const fullName = {
                value: `${this.givenNames[0].value} ${this.surname.value}`,
                confidence: fields_1.TextField.arrayConfidence([
                    this.surname,
                    this.givenNames[0],
                ]),
            };
            return new fields_1.TextField({
                prediction: fullName,
                pageId: pageNumber,
                reconstructed: true,
            });
        }
    }
    constructMRZ(pageNumber) {
        if (this.mrz1.value && this.mrz2.value) {
            const mrz = {
                value: `${this.mrz1.value}${this.mrz2.value}`,
                confidence: fields_1.TextField.arrayConfidence([this.mrz1, this.mrz2]),
            };
            return new fields_1.TextField({
                prediction: mrz,
                pageId: pageNumber,
                reconstructed: true,
            });
        }
    }
}
exports.PassportV1 = PassportV1;
_PassportV1_instances = new WeakSet(), _PassportV1_checklist = function _PassportV1_checklist() {
    if (this.mrz1.value && this.mrz2.value) {
        const mrz = MRZ.parse([this.mrz1.value, this.mrz2.value]);
        this.checklist = {
            mrzValid: this.isMRZValid(mrz),
            mrzValidBirthDate: this.isBirthDateValid(mrz),
            mrzValidExpiryDate: this.isExpiryDateValid(mrz),
            mrzValidIdNumber: this.isIdNumberValid(mrz),
            mrzValidSurname: this.isSurnameValid(mrz),
            mrzValidCountry: this.isCountryValid(mrz),
        };
    }
};
