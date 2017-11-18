var module = {
    "seriesName": "Electricity & Electronics",
    "heading": "<p>Electricity&nbsp;</p><p style='margin-top:-15px'>&nbsp; &nbsp;&amp; Electronics</p>",
    "passingScore": "70",
    "moduleTitle": "FLASHING THE BCM",
    "moduleType": "Equipment",
    "activity": [
        {
            "id": 1,
            "activity": 1,
            "title": "Installing a BCM",
            "intro": "Welcome to the Virtual Shop. Installing a new module is not the same as installing a mechanical component. Modules must be programmed before they will function in the vehicle.",
            "safety": "When working in the shop, always follow the safety guidelines provided in service information, tool operation manuals, and other technical literature. To protest yourself from injury, wear personal protective equipment (PPE), dress appropriately, work professionally, and correctly handle tools and equipment. Click on the continue button to acknowledge that you understand the importance of safety in the auto- motive shop.",
            "cc": {
                "narrative": [
                    "Activity 1: Installing a BCM. Before the module can be used, it must be programmed to the vehicle and the latest software installed.",
                    "You have a vehicle in the shop with a customer complaint that the trunk release does not work.",
                    "The vehicle is a 2012 CL Apollo IX50, 3.9 Liter V6.",
                    "In the simulation Testing BCM Power, the BCM was diagnosed as faulty for not commanding the trunk release relay to operate.",
                    "The BCM power and ground circuits have been tested.",
                    "You will now replace and flash the BCM."
                ],
                "ccTasks": [
                    {
                        "task": [
                            "The BCM in this vehicle is on the left side of the instrument panel. Click on the BCM to remove the connectors."
                        ]
                    },
                    {
                        "task": [
                            "Now drag the BCM to remove it from the vehicle."
                        ]
                    },
                    {
                        "task": [
                            "Retrieve a new BCM from the Parts Department."
                        ]
                    },
                    {
                        "task": [
                            "Drag the new BCM to install it in the vehicle."
                        ]
                    }
                ],
                "taskComplete": [],
                "assessment": []
            },
            "taskDescription": "",
            "tasks": [
                "Click on the BCM to remove the connectors.",
                "Drag the BCM to remove it.",
                "Retrieve the new BCM from the Parts Department.",
                "Drag the new BCM to install it in the vehicle."
            ],
            "possiblePoints": [
                "3",
                "3",
                "3",
                "3"
            ],
            "positiveResponse": [
                {
                    "task": "That's correct.",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "",
                    "spot": []
                },
                {
                    "task": "Good job.",
                    "spot": []
                }
            ],
            "negitiveResponse": [
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                }
            ],
            "reportLabel": [
                "Click on the BCM",
                "Remove the BCM",
                "Retrieve the new BCM from the parts department",
                "Install the new BCM"
            ],
            "assessment": [],
            "endScreen": "yes",
            "endScreenText": "<b style=\"height: 70px;\">You have completed Activity 1: Installing a BCM</b>. <br/> Physically installing the BCM is only part of the job. Now it must be programmed."
        },

        {
            "id": 2,
            "activity": 2,
            "title": "Flashing the BCM",
            "intro": "Activity 2: Flashing the BCM. Flashing is another name for programming a module. Nearly all new modules must be programmed once installed.",
            "cc": {
                "narrativeSkip": true,
                "narrative": [
                    "Activity 2: Flashing the BCM. Flashing is another name for programming a module.",
                    "Stable battery voltage is critical during programming. Any fluctuation, spiking, over voltage, or loss of voltage will interrupt programming.",
                    "To begin, you need to install a suitable battery charger to maintain system voltage."
                ],
                "ccTasks": [
                    {
                        "task": [
                            "Connect the battery charger red cable to the battery positive post."
                        ]
                    },
                    {
                        "task": [
                            "Connect the black cable to the battery negative post."
                        ]
                    },
                    {
                        "task": [
                            "Now, select the correct application on the battery charger."
                        ]
                    },
                    {
                      "narrative": [
                          "Before programming you should be sure to turn off or disable any system that may put a load on the battery."
                      ]
                    },
                    {
                        "assessment": [
                            {
                                "id": 1,
                                "question": "Select the systems that may need to be turned OFF during programming.",
                                "possiblePoints": "1",
                                "randomize": true,
                                "answers": [
                                    {
                                        "id": 1,
                                        "answer": "Interior lights",
                                        "correct": true,
                                        "type": "checkbox"
                                    },
                                    {
                                        "id": 2,
                                        "answer": "Automatic headlights",
                                        "correct": true,
                                        "type": "checkbox"
                                    },
                                    {
                                        "id": 3,
                                        "answer": "Radio",
                                        "correct": true,
                                        "type": "checkbox"
                                    },
                                    {
                                        "id": 4,
                                        "answer": "Windshield wipers",
                                        "correct": false,
                                        "type": "checkbox"
                                    },
                                    {
                                        "id": 5,
                                        "answer": "HVAC system",
                                        "correct": true,
                                        "type": "checkbox"
                                    },
                                    {
                                        "id": 6,
                                        "answer": "Brake lights",
                                        "correct": false,
                                        "type": "checkbox"
                                    },
                                    {
                                        "id": 7,
                                        "answer": "Navigation",
                                        "correct": true,
                                        "type": "checkbox"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "task": [
                            "Select the scan tool from the tool tray."
                        ]
                    },
                    {
                        "narrative": [
                            "Locate the Data Link Connector (DLC) under the dash."
                        ]
                    },
                    {
                        "task": [
                            "Drag the cable from the scan tool and connect it to the DLC."
                        ]
                    },
                    {
                        "task": [
                            "Now turn the scan tool on."
                        ]
                    },
                    {
                        "task": [
                            "Now select the Service Programming System from the main menu."
                        ]
                    },
                    {
                        "task": [
                            "You may click on the service information icon above to reference the repair order that contains pertinent vehicle information. Select the correct Vehicle Type."
                        ]
                    },
                    {
                        "task": [
                            "Now, select the vehicles Product Line."
                        ]
                    },
                    {
                        "task": [
                            "Next, select the vehicles Model Year."
                        ]
                    },
                    {
                      "narrative": [
                          "Connect the scan tool to the computer.",
                      ]
                    },
                    {
                        "task": [
                            "To begin, attach the data cable to the scan tool."
                        ]
                    },
                    {
                        "task": [
                            "Now connect the other end of the data cable to the laptop."
                        ]
                    },
                    {
                        "task": [
                            "From the manufacturer’s service information website, select the Year of the vehicle from the drop down list."
                        ]
                    },
                    {
                        "task": [
                            "Now select the Make of the vehicle."
                        ]
                    },
                    {
                        "task": [
                            "Select the Model of the vehicle."
                        ]
                    },
                    {
                        "task": [
                            "Select the Engine type of the vehicle."
                        ]
                    },
                    {
                        "narrative": ""
                    },
                    {
                       "assessment": [
                                {
                                    "id": 2,
                                    "question": "Is this the correct VIN?",
                                    "possiblePoints": "1",
                                    "randomize": true,
                                    "answers": [
                                        {
                                            "id": 1,
                                            "answer": "Yes",
                                            "correct": true,
                                            "type": "radio"
                                        },
                                        {
                                            "id": 2,
                                            "answer": "No",
                                            "correct": false,
                                            "type": "radio"
                                        }
                                    ]
                                }

                            ],
                    },
                    {
                        "task": [
                            "Select the correct module to program."
                        ]
                    },
                    {
                        "task": [
                            "Select the module part number from the drop down list."
                        ]
                    },
                    {
                        "task": [
                            "Select the calibration files for the correct BCM."
                        ]
                    },
                    {
                        "task": [
                            "Click the Next button to begin the download from the website."
                        ]
                    },
                    {
                        "task": [
                            "Now, click the Next button to confirm the download."
                        ]
                    },
                    {
                        "assessment": [
                            {
                                "id": 3,
                                "question": "Now that the download and programming is complete, what is the next step?",
                                "possiblePoints": "1",
                                "randomize": true,
                                "answers": [
                                    {
                                        "id": 1,
                                        "answer": "Unplug the scan tool.",
                                        "correct": false,
                                        "type": "radio"
                                    },
                                    {
                                        "id": 2,
                                        "answer": "Disconnect the battery.",
                                        "correct": false,
                                        "type": "radio"
                                    },
                                    {
                                        "id": 3,
                                        "answer": "Turn the ignition OFF then ON.",
                                        "correct": true,
                                        "type": "radio"
                                    },
                                    {
                                        "id": 4,
                                        "answer": "None of the above.",
                                        "correct": false,
                                        "type": "radio"
                                    }
                                ]
                            }

                        ],
                    },
                    {
                        "task": [
                            "Turn off the ignition."
                        ]
                    },
                    {
                        "task": [
                            "Now turn the ignition back on."
                        ]
                    },
                    {
                        "task": [
                            "Next, check the operation of the trunk release. Click on the trunk release button."
                        ]
                    }
                ],
                "taskComplete": [],
                "assessment": [
                    "Select the systems that may need to be turned OFF during programming.",
                    "Now that the download and programming is complete, what is the next step?"
                ]
            },
            "taskDescription": "",
            "tasks": [
                "Connect the red cable to the battery positive post",
                "Connect the black cable to the battery negative post",
                "Select the correct application on the battery charger",
                "Select the systems that may need to be turned OFF during programming",
                "Select the scan tool from the tool tray",
                "Connect the scan tool cable to the DLC",
                "Turn the scan tool on",
                "Select the Service Programming System from the main menu",
                "Select the correct Vehicle Type",
                "Select the vehicles Product Line",
                "Select the vehicles Model Year",
                "Connect the data cable to the scan tool",
                "Connect the data cable to the laptop",
                "From the manufacturer’s service information website, select the year of the vehicle from the drop down list",
                "Select the make of the vehicle",
                "Select the model of the vehicle",
                "Select the engine type of the vehicle",
                "Is this the correct VIN?",
                "Select the correct module to program",
                "Select the module part number from the drop down list",
                "Select the calibration files for the correct BCM",
                "Click the Next button to begin the download from the website",
                "Click the next button to confirm the download",
                "Now that the download and programming is complete, what is the next step?",
                "Turn off the ignition",
                "Turn the ignition back on",
                "Click on the trunk release button"
            ],
            "possiblePoints": [
                "3",
                "3",
                "3",
                "0",
                "1",
                "3",
                "0",
                "3",
                "3",
                "3",
                "3",
                "3",
                "3",
                "0",
                "3",
                "3",
                "3",
                "3",
                "3",
                "3",
                "1",
                "0",
                "3",
                "3",
                "3",
                "3",
                "3",
                "1",
                "3",
                "3",
                "3"
            ],
            "positiveResponse": [
                {
                    "task": "That's correct.",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "Excellent.",
                    "spot": []
                },
                {
                    "task": "Excellent.",
                    "spot": []
                },
                {
                    "task": "",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "That's correct.",
                    "spot": []
                },
                {
                    "task": "That's correct.",
                    "spot": []
                },
                {
                    "task": "That's correct.",
                    "spot": []
                },
                {
                    "task": "That’s correct.",
                    "spot": []
                },
                {
                    "task": "That’s correct.",
                    "spot": []
                },
                {
                    "task": "",
                    "spot": []
                },
                {
                    "task": "That’s correct.",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "That's correct.",
                    "spot": []
                },
                {
                    "task": "Excellent.",
                    "spot": []
                },
                {
                    "task": "Excellent.",
                    "spot": []
                },
                {
                    "task": "Excellent.",
                    "spot": []
                },
                {
                    "task": "",
                    "spot": []
                },
                {
                    "task": "",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "Excellent.",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "",
                    "spot": []
                },
                {
                    "task": "Good.",
                    "spot": []
                },
                {
                    "task": "Good job.",
                    "spot": []
                },
                {
                    "task": "Good job.",
                    "spot": []
                }
            ],
            "negitiveResponse": [
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                },
                {
                    "task": "Please follow the steps provided.",
                    "spot": []
                }
            ],
            "reportLabel": [
                "Connect the red cable to the battery positive post",
                "Connect the black cable to the battery negative post",
                "Select the correct application on the battery charger",
                "",
                "Select the systems that may need to be turned OFF during programming",
                "Select the scan tool from the tool tray",
                "",
                "Connect the scan tool cable to the DLC",
                "Turn the scan tool on",
                "Select the Service Programming System from the main menu",
                "Select the correct Vehicle Type",
                "Select the vehicles Product Line",
                "Select the vehicles Model Year",
                "",
                "Connect the data cable to the scan tool",
                "Connect the data cable to the laptop",
                "Select the year of the vehicle",
                "Select the make of the vehicle",
                "Select the model of the vehicle",
                "Select the engine type of the vehicle",
                "Is this the correct VIN?",
                "",
                "Select the correct module to program",
				"Select the module part number from the drop down list",
                "Select the calibration files for the correct BCM",
                "Click the Next button to begin the download from the website",
                "Click on the “Next” button to begin the download from the website",
                "Click the next button to confirm the download",
				"Turn off the ignition",
                "Turn the ignition back on",
                "Click on the trunk release button"
            ],
            "assessment": [],
            "endScreen": "yes",
            "endScreenText": "You have completed Activity 2: Flashing the BCM. <br/> You have successfully reprogrammed the BCM and confirmed that the customer’s concern has been fixed."
        }
    ],
    "finalAssessment": [
        {
            "id": 1,
            "question": "Before attempting to reprogram a module, you should first:",
            "possiblePoints": "1",
            "randomize": true,
            "answers": [
                {
                    "id": 1,
                    "answer": "Connect a battery charger.",
                    "correct": false,
                    "type": "radio"
                },
                {
                    "id": 2,
                    "answer": "Update the scan tool software to the latest version.",
                    "correct": true,
                    "type": "radio"
                },
                {
                    "id": 3,
                    "answer": "Disconnect the vehicle’s battery.",
                    "correct": false,
                    "type": "radio"
                },
                {
                    "id": 4,
                    "answer": "Download the new software from the manufacturer’s website.",
                    "correct": false,
                    "type": "radio"
                }
            ]
        },
        {
            "id": 2,
            "question": "Technician A says module programming can be done using aftermarket tools and equipment that meet the J2534 standard. Technician B says only factory level scan tools can be used for programming modules. Who is correct?",
            "possiblePoints": "1",
            "randomize": false,
            "answers": [
                {
                    "id": 1,
                    "answer": "Technician A",
                    "correct": true,
                    "type": "radio"
                },
                {
                    "id": 2,
                    "answer": "Technician B",
                    "correct": false,
                    "type": "radio"
                },
                {
                    "id": 3,
                    "answer": "Both Technician A and Technician B",
                    "correct": false,
                    "type": "radio"
                },
                {
                    "id": 4,
                    "answer": "Neither Technician A nor Technician B",
                    "correct": false,
                    "type": "radio"
                }
            ]
        },
        {
            "id": 3,
            "question": "Technician A says that all accessories should be off before attempting to program a module. Technician B says the ignition should be off during programming to prevent discharging the battery. Who is correct?",
            "possiblePoints": "1",
            "randomize": false,
            "answers": [
                {
                    "id": 1,
                    "answer": "Technician A",
                    "correct": true,
                    "type": "radio"
                },
                {
                    "id": 2,
                    "answer": "Technician B",
                    "correct": false,
                    "type": "radio"
                },
                {
                    "id": 3,
                    "answer": "Both Technician A and Technician B",
                    "correct": false,
                    "type": "radio"
                },
                {
                    "id": 4,
                    "answer": "Neither Technician A nor Technician B",
                    "correct": false,
                    "type": "radio"
                }
            ]
        },
        {
            "id": 4,
            "question": "Which of the following is required for programming a module?",
            "possiblePoints": "1",
            "randomize": true,
            "answers": [
                {
                    "id": 1,
                    "answer": "A pass-through device.",
                    "correct": false,
                    "type": "radio"
                },
                {
                    "id": 2,
                    "answer": "Access to the manufacturer’s service information and programming files.",
                    "correct": true,
                    "type": "radio"
                },
                {
                    "id": 3,
                    "answer": "A factory level scan tool.",
                    "correct": false,
                    "type": "radio"
                },
                {
                    "id": 4,
                    "answer": "A special scan tool that connects to the Internet",
                    "correct": false,
                    "type": "radio"
                }
            ]
        }
    ]
}