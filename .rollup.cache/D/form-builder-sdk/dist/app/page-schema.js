const formSchema = {
    "id": "form_21",
    "name": "form_21",
    "title": "ENTER NOW",
    "description": "",
    "fields": [
        {
            "id": "field_2",
            "name": "first_name",
            "type": "text",
            "label": "",
            "placeholder": "First Name",
            "required": true,
            "validation": {
                "requiredMessage": "First name is required"
            },
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            }
        },
        {
            "id": "field_3",
            "name": "last_name",
            "type": "text",
            "label": "",
            "placeholder": "Last Name",
            "required": true,
            "validation": {
                "requiredMessage": "Last name is required"
            },
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            }
        },
        {
            "id": "field_6",
            "name": "dob",
            "type": "date",
            "label": "",
            "placeholder": "Date of Birth",
            "required": true,
            "validation": {
                "dateFormat": "MM/DD/YYYY",
                "minAge": 18,
                "requiredMessage": "Birth date is required",
                "dateFormatMessage": "Please enter date in MM/DD/YYYY format",
                "minAgeMessage": "You must be atleast 18 years old",
                "maxDate": "2007-10-03"
            },
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            },
            "dateFormat": "MM/DD/YYYY"
        },
        {
            "id": "field_7",
            "name": "email_id",
            "type": "email",
            "label": "",
            "placeholder": "Email Address",
            "required": true,
            "validation": {
                "requiredMessage": "Email field is required",
                "emailMessage": "Please enter valid email address"
            },
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            }
        },
        {
            "id": "field_9",
            "name": "postal_code",
            "type": "postal",
            "label": "",
            "placeholder": "Postal Code",
            "required": true,
            "validation": {
                "requiredMessage": "Postal code is required",
                "postalFormat": "CA"
            },
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            }
        },
        {
            "id": "field_10",
            "name": "receipt_image",
            "type": "file",
            "label": "",
            "placeholder": "Upload Receipt Image",
            "required": true,
            "validation": {
                "maxFileSize": 10,
                "fileTypes": [
                    "jpg",
                    "png"
                ],
                "requiredMessage": "Receipt image is required",
                "fileSizeMessage": "File size must be less than 10MB",
                "fileTypeMessage": "Only jpg and png files are allowed"
            },
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            }
        },
        {
            "id": "field_12",
            "name": "is_scene_member",
            "type": "checkbox",
            "label": "",
            "placeholder": "Enter checkbox...",
            "required": false,
            "validation": {},
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            }
        },
        {
            "id": "field_13",
            "name": "is_contractor",
            "type": "checkbox",
            "label": "",
            "placeholder": "Enter checkbox...",
            "required": false,
            "validation": {},
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            }
        },
        {
            "id": "field_16",
            "name": "business_name",
            "type": "text",
            "label": "",
            "placeholder": "Business Name",
            "required": true,
            "validation": {
                "requiredMessage": "Business Name is required"
            },
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            }
        },
        {
            "id": "field_17",
            "name": "trade_type",
            "type": "dropdown",
            "label": "",
            "placeholder": "Trade Type",
            "required": true,
            "validation": {
                "requiredMessage": "Trade Type is required"
            },
            "width": "w-1/2",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            },
            "options": [
                {
                    "id": "1",
                    "label": "store one",
                    "value": "one"
                },
                {
                    "id": "2",
                    "label": "store two",
                    "value": "two"
                },
                {
                    "id": "option_1",
                    "label": "store three",
                    "value": "three"
                }
            ]
        },
        {
            "id": "field_18",
            "name": "agree_marketing",
            "type": "terms",
            "label": "",
            "placeholder": "Enter terms...",
            "required": true,
            "validation": {
                "requiredMessage": "Agree for maketing is required"
            },
            "width": "w-full",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            },
            "mode": "checkbox",
            "content": "By entering the Contest I agree to the Terms & Conditions and authorize Home Hardware Stores Limited to collect the personal information disclosed in this form, and any additional information as described in the Terms & Conditions, for the purpose of administering the Contest and maintaining an accurate customer database. I understand that this information will be managed in accordance with the Home Hardware Stores Limited Privacy Policy. For Quebec Residents: Your personal information may be transferred outside of Quebec.",
            "links": [
                {
                    "id": "terms_link",
                    "text": "Terms & Conditions",
                    "url": "https://example.com/terms"
                },
                {
                    "id": "privacy_link",
                    "text": "Privacy Policy",
                    "url": "https://example.com/privacy"
                }
            ]
        },
        {
            "id": "field_19",
            "name": "agree_subscription",
            "type": "terms",
            "label": "",
            "placeholder": "Enter terms...",
            "required": true,
            "validation": {
                "requiredMessage": "You must agree to receive marketing messages"
            },
            "width": "w-full",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "left",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#374151",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            },
            "mode": "checkbox",
            "content": "I agree to receive marketing messages from Home Hardware Stores Limited, its affiliates and/or marketing partners. You may unsubscribe at any time.",
            "links": []
        },
        {
            "id": "field_20",
            "name": "",
            "type": "terms",
            "label": "",
            "placeholder": "Enter terms...",
            "required": false,
            "validation": {},
            "width": "w-full",
            "style": {
                "label": {
                    "color": "#111827",
                    "font-weight": "500",
                    "font-size": "16px",
                    "text-align": "center",
                    "margin-bottom": "4px"
                },
                "input": {
                    "background-color": "#ffffff",
                    "border-color": "#ffffff",
                    "border-radius": "4px",
                    "border-width": "2px",
                    "padding": "12px 16px",
                    "font-size": "16px",
                    "height": "48px",
                    "color": "#111827"
                }
            },
            "mode": "text",
            "content": "You must be subscribed to receive emails to enter and win.",
            "links": []
        }
    ],
    "design": {
        "background-color": "#ffffff",
        "font-family": "custom",
        "font-size": "text-base",
        "padding": "p-8",
        "max-width": "max-w-4xl",
        "border-radius": "rounded-lg",
        "box-shadow": "shadow-lg",
        "logo-url": "",
        "submit-button": {
            "text": "SUBMIT",
            "background-color": "#eb2229",
            "text-color": "#ffffff",
            "padding": "14px 72px",
            "border-radius": "6px",
            "font-size": "16px",
            "font-weight": "semibold",
            "width": "auto",
            "alignment": "center"
        },
        "spacing": {
            "container": "p-6",
            "fields": "space-y-6"
        },
        "font-link": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    }
};
export default formSchema;
//# sourceMappingURL=page-schema.js.map