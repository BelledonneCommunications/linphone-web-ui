/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals linphone*/

linphone.ui.i18n = {
	content: {
		dialer: {
			address: {
				en_US : 'SIP address or phone number',
				fr_FR : 'Adresse SIP ou numéro de téléphone'	
			},
			call: {
				en_US : 'Call',
				fr_FR : 'Appel'
			},
			chat: {
				en_US : 'Chat',
				fr_FR : 'Chat'
			}
		},
		mainbar: {
			ringtone: {
					en_US : 'Ring',
					fr_FR : 'Sonnerie'
			}
		},
		menu: {
			calls: {
					en_US : 'Calls',
					fr_FR : 'Appels'
			},
			chats: {
					en_US : 'Chats',
					fr_FR : 'Chats'
			},
			contacts: {
					en_US : 'Contacts',
					fr_FR : 'Contacts'
			},
			history: {
					en_US : 'History',
					fr_FR : 'Historique'
			}
		},
		offline: {
			title: {
				en_US : 'You are not connected to Internet.',
				fr_FR : 'Vous n\'êtes pas connecté à Internet.'	
			}
		},
		popup: {
			error: {
				title: {
						en_US : 'Error',
						fr_FR : 'Erreur'
				}
			},
			incall: {
				title: {
						en_US : 'Incoming Call',
						fr_FR : 'Appel entrant'
				}
			},
			outcall: {
				title: {
						en_US : 'Outgoing Call',
						fr_FR : 'Appel sortant'
				}
			},
			video: {
				title: {
						en_US : 'Video',
						fr_FR : 'Vidéo'
				},
				message: {
						en_US : 'proposed to start video. Do you accept ?',
						fr_FR : 'propose de démarrer la vidéo avec vous. Acceptez-vous ?'
				}
			}
		},
		view: {
			about: {
				links: {
					sales : {
						en_US : 'Sales service',
						fr_FR : 'Service commercial'
					},
					support : {
						en_US : 'Support service',
						fr_FR : 'Service support'
					},
					license : {
						en_US : 'License',
						fr_FR : 'Licence'
					}
				},
				title: {
					en_US : 'About',
					fr_FR : 'À Propos'
				},
				versions: {
					core : {
						en_US : 'Core version',
						fr_FR : 'Version du cœur'
					},
					webapp : {
						en_US : 'Web app version',
						fr_FR : 'Version de l\'application web'
					},
					plugin : {
						en_US : 'Plugin version',
						fr_FR : 'Version du plugin'
					},
					rootfs : {
						en_US : 'Rootfs version',
						fr_FR : 'Version du rootfs'
					}
				}
			},
			call: {
				conference: {
					en_US : 'Conference',
					fr_FR : 'Conférence'
				},
				hangup: {
					en_US : 'Hang-up',
					fr_FR : 'Raccrocher'
				},
				micro: {
					en_US : 'Micro',
					fr_FR : 'Micro'
				},
				pause: {
					en_US : 'Pause',
					fr_FR : 'Pause'
				},
				video: {
					en_US : 'Video',
					fr_FR : 'Vidéo'
				}
			},
			chat: {
				send: {
					en_US : 'Send',
					fr_FR : 'Envoyer'
				},
				send_file: {
					en_US : 'Send file',
					fr_FR : 'Envoyer un fichier'
				},
				is_composing: {
					en_US : 'Remote is composing ...',
					fr_FR : 'Votre correspondant est en train d\'écrire...'
				},
				download_file: {
					en_US : 'Download',
					fr_FR : 'Télécharger'
				},
				sent_file: {
					en_US : 'File sent : ',
					fr_FR : 'Fichier envoyé : '
				},
				received_file: {
					en_US : 'File received : ',
					fr_FR : 'Fichier reçu : '
				}
			},
			conference: {
				conference: {
					en_US : 'Conference',
					fr_FR : 'Conférence'
				},
				micro: {
					en_US : 'Micro',
					fr_FR : 'Micro'
				},
				pause: {
					en_US : 'Pause',
					fr_FR : 'Pause'
				},
				video: {
					en_US : 'Video',
					fr_FR : 'Vidéo'
				}
			},
			contact: {
				addressContact: {
					en_US : 'SIP or phone number',
					fr_FR : 'SIP ou numéro de télephone'
				},
				firstname: {
					en_US : 'First name',
					fr_FR : 'Prénom'
				},
				lastname: {
					en_US : 'Last name',
					fr_FR : 'Nom'
				},
				remove: {
					en_US : 'Remove contact',
					fr_FR : 'Supprimer le contact'
				},
				presence: {
					en_US : 'Presence',
					fr_FR : 'Présence'
				},
				showPresence: {
					en_US : 'Show this contact presence status',
					fr_FR : 'Voir l\'état de présence de ce contact'
				},
				allowPresence: {
					en_US : 'Allow this contact to see my presence status',
					fr_FR : 'Autoriser ce contact à voir ma présence'
				}
			},
			contacts: {
				add: {
					en_US : 'Add a contact',
					fr_FR : 'Ajouter un contact'
				},
				filter: {
					all: {
						en_US : 'All',
						fr_FR : 'Tous'
					},
					online: {
						en_US : 'Online',
						fr_FR : 'Disponible'
					}
				}
			},
			error: {
				title: {
					en_US : 'Error',
					fr_FR : 'Erreur'
				},
				reload: {
					en_US : 'Reload',
					fr_FR : 'Recharger'
				}
			},
			help: {
				title: {
					en_US : 'Help',
					fr_FR : 'Aide'
				},
				firstLine: {
					en_US : 'Linphone web is web app to place both audio and video calls to anyone with a sip address through internet.',
					fr_FR : 'Linphone web est une application internet permettant de passer des appels audio et vidéo en utilisant une adresse SIP.'
				},
				gettingStarted: {
					en_US : 'Getting started',
					fr_FR : 'Pour commencer'
				},
				linphoneWebPlugin: {
					en_US : 'Linphone web requires the Linphone-Web plugin to be installed. Just follow installation instructions.',
					fr_FR : 'Pour utiliser Linphone Web, le plugin Linphone-Web doit être installé. Il suffit de suivre les instructions d\'installation.'
				},
				SIPAccount: {
					en_US : 'Login with a SIP account',
					fr_FR : 'Se connecter avec un compte SIP'
				},
				SIPAccountInstr: {
					en_US : 'You can simply create a sip account from',
					fr_FR : 'Vous pouvez facilement créer un compte SIP à partir du lien  '
				},
				SIPAccountInstrEnd: {
					en_US : 'Advanced users can use their own sip account from any sip service.',
					fr_FR : 'Les utilisateurs avancés peuvent utiliser leur propre compte SIP.'
				},
				call: {
					en_US : 'Place call',
					fr_FR : 'Passer un appel'
				},
				callInstruction: {
					en_US : 'After logging in, just type either a sip address (sip:john@sip.linphone.org)  or just your friend login name if on the same domain (I.E just ‘john’) ',
					fr_FR : 'Une fois connecté, il suffit de taper dans la barre d\'adresse soit une adresse SIP (sip: john@sip.linphone.org) soit le nom d\'utilisateur de votre contact s\'il s\'agit du même domaine (ex: juste ‘john’)'
				},
				lastLine: {
					en_US : 'For more information, visit our web site at',
					fr_FR : 'Pour plus d\'information, visitez notre site web à l\'adresse '
				}
			},
			history: {
				direction: {
					title: {
						en_US : 'Direction',
						fr_FR : 'Direction'
					},
					values: {
						outgoing: {
							en_US : 'Outgoing',
							fr_FR : 'Sortant'
						},
						incoming: {
							en_US : 'Incoming',
							fr_FR : 'Entrant'
						}
					}
				},
				duration: {
					title: {
						en_US : 'Duration',
						fr_FR : 'Durée'
					}
				},
				call: {
					en_US : 'Call',
					fr_FR : 'Appel'
				},
				filter: {
					all: {
						en_US : 'All',
						fr_FR : 'Tous'
					},
					incoming: {
						en_US : 'Incomings',
						fr_FR : 'Entrants'
					},
					miss: {
						en_US : 'Miss',
						fr_FR : 'Manqués'
					},
					outgoing: {
						en_US : 'Outgoings',
						fr_FR : 'Sortants'
					}
				},
				remove: {
					en_US : 'Delete history',
					fr_FR : 'Supprimer l\'historique'
				},
				see: {
					en_US : 'See history',
					fr_FR : 'Voir l\'historique'
				},
				status: {
					title: {
						en_US : 'Status',
						fr_FR : 'Status'
					},
					values: {
						aborted: {
							en_US : 'Aborted',
							fr_FR : 'Annulé'
						},
						declined: {
							en_US : 'Declined',
							fr_FR : 'Refusé'
						},
						missed: {
							en_US : 'Missed',
							fr_FR : 'Manqué'
						},
						success: {
							en_US : 'Success',
							fr_FR : 'Réussi'
						}
					}
				},
				time: {
					title: {
						en_US : 'Date',
						fr_FR : 'Date'
					}
				}
			},
			login: {
				accountAdvanced: {
					account: {
						en_US : 'Username',
						fr_FR : 'Nom d\'utilisateur'
					},
					errors: {
						account: {
							en_US : 'The \'Linphone account\' field is incorrect',
							fr_FR : 'L\'entrée \'Compte linphone\' est invalide'
						},
						password: {
							en_US : 'The \'password\' field is incorrect',
							fr_FR : 'L\'entrée \'Mot de passe\' est invalide'
						},
						domain: {
							en_US : 'The \'domain\' field is incorrect',
							fr_FR : 'L\'entrée \'Domaine\' est invalide'
						},
						registrationFailed: {
							en_US : 'Authentification failure',
							fr_FR : 'Echec d\'authentification'
						}
					},
					password: {
						en_US : 'Password',
						fr_FR : 'Mot de passe'
					},
					domain: {
						en_US : 'Domain',
						fr_FR : 'Domaine'
					},
					proxy: {
						en_US : 'Proxy (optional)',
						fr_FR : 'Proxy (optionnel)'
					},
					outband_proxy: {
						en_US : 'Outband proxy',
						fr_FR : 'Proxy sortant'
					},
					transport: {
						en_US : 'Transport',
						fr_FR : 'Transport'
					}
				},
				accountSimple: {
					account: {
						en_US : 'Linphone username',
						fr_FR : 'Nom d\'utilisateur Linphone'
					},
					errors: {
						account: {
							en_US : 'The \'Linphone account\' field is incorrect',
							fr_FR : 'L\'entrée \'Compte linphone\' est invalide'
						},
						password: {
							en_US : 'The \'password\' field is incorrect',
							fr_FR : 'L\'entrée \'Mot de passe\' est invalide'
						}
					},
					password: {
						en_US : 'Password',
						fr_FR : 'Mot de passe'
					}
				},
				advanced: {
					en_US : 'Advanced settings',
					fr_FR : 'Options avancées'
				},
				create: {
					en_US : 'Create Linphone account',
					fr_FR : 'Créer un compte Linphone'
				},
				rememberMe: {
					en_US : 'Remember me',
					fr_FR : 'Se souvenir de moi'
				},
				errors: {
					registrationFailed: {
						en_US : 'Failed to connect to the server',
						fr_FR : 'Connection au serveur impossible'
					},
					registrationTimeout: {
						en_US : 'Authentification timeout',
						fr_FR : 'Expiration de l\'authentification'
					},
					account: {
						en_US : 'Invalid username or password ',
						fr_FR : 'Le nom d\'utilisateur ou le mot de passe est invalide'
					}
				},
				login: {
					en_US : 'Login',
					fr_FR : 'S\'enregister'
				},
				simple: {
					en_US : 'Use a Linphone account',
					fr_FR : 'Utiliser un compte Linphone'
				},
				title: {
					en_US : 'Welcome',
					fr_FR : 'Bienvenue'
				},
				wait: {
					en_US : 'Login in progress, please wait...',
					fr_FR : 'Enregistrement en cours, veuillez patienter...'
				}
			},
			install: {
				title: {
					en_US : 'How to install',
					fr_FR : 'Installation'
				},
				reload: {
					en_US : 'Reload',
					fr_FR : 'Recharger'
				},
				text: {
					install_windows : {
						en_US : 'Run the installer you just downloaded. If you have a warning message, click on "More info" then "Run anyway". Once the installation finishes, click on "Reload" button below.',
						fr_FR : 'Exécutez le fichier que vous venez de télécharger. Si vous voyez un message d\'avertissement, cliquez sur "Plus d\'informations", puis sur "Exécuter quand même". Une fois l\'installation terminée, cliquez sur le bouton "Recharger" ci-dessous.'
					},
					install_mac : {
						en_US : 'Run the installer you just downloaded. Once the installation finishes, click on "Reload" button below.',
						fr_FR : 'Exécutez le fichier que vous venez de télécharger. Une fois l\'installation terminée, cliquez sur le bouton "Recharger" ci-dessous.'
					},
					install_tar_gz : {
						en_US : 'If it doesn\'t exist yet, create the .mozilla/plugins/ folder in your home directory (~). Then extract the archive you just downloaded inside this folder. Finally, click on the "Refresh" button below.',
						fr_FR : 'S\'il n\'existe pas déjà, créez le dossier .mozilla/plugins/ dans votre répertoire maison (~). Ensuite décompressez l\'archive que vous venez de télécharger à l\'intérieur de ce dossier. Pour finir, cliquez sur le bouton "Recharger" ci-dessous.'
					}
				}
			},
			plugin: {
				download: {
					en_US : 'Download',
					fr_FR : 'Télécharger'
				},
				reload: {
					en_US : 'Reload',
					fr_FR : 'Recharger'
				},
				text: {
					auto : { // Automatic plugin installation
						en_US : 'The plugin is not installed. Please wait and accept the automatic install of the plugin.',
						fr_FR : 'Le plugin n\'est pas installé. Veuillez attendre et accepter l\'installation automatique du plugin.'
					},
					auto_or_update : { // With IE, we can not detect the current version without issue (javascript caching)
						en_US : 'The plugin is not installed or updated. Please wait a few seconds and click on the "Install" button of the popup that will appear at the bottom of this window. If you have already updated the plugin and still get this message, restart your browser.',
						fr_FR : 'Le plugin n\'est pas installé ou pas à jour. Veuillez patienter quelques secondes et cliquez sur le bouton "Installer" de la fenêtre qui va apparaître en bas de votre navigateur. Si vous avez déjà mis le plugin à jour et que vous avez toujours ce message, redémarrez votre navigateur.'
					},
					download : { // No automatic plugin intallation
						en_US : 'The plugin is not installed. Please download it using the following button.',
						fr_FR : 'Le plugin n\'est pas installé. Veuillez le télécharger en utilisant le bouton suivant.'
					},
					outdated_download : { // No automatic plugin update
						en_US : 'The plugin is outdated. Please download it using the following button. If you have already updated the plugin and still get this message, restart your browser.',
						fr_FR : 'Le plugin n\'est pas à jour. Veuillez accepter l\'installation automatique du plugin. Si vous avez déjà mis le plugin à jour et que vous avez toujours ce message, redémarrez votre navigateur.'
					},
					outdated_auto : { // Automatic plugin update
						en_US : 'The plugin is outdated. Please wait and accept the automatic install of the plugin. If you have already updated the plugin and still get this message, restart your browser.',
						fr_FR : 'Le plugin n\'est pas à jour. Veuillez attendre et accepter l\'installation automatique du plugin. Si vous avez déjà mis le plugin à jour et que vous avez toujours ce message, redémarrez votre navigateur.'
					},
					mobile_application: {
						en_US : 'Linphone web is not avalaible on this platform, you can download the Linphone mobile application here :',
						fr_FR : 'Linphone web n\'est pas disponible sur cette plateforme, vous pouvez télécharger l\'application mobile Linphone à l\'adresse suivante : '
					}
				},
				links: {
					android : { // GooglePlay Store link
						en_US : 'Linphone on Google Play',
						fr_FR : 'Linphone sur Google Play'
					},
					iOS : { // AppleStore Store link
						en_US : 'Linphone on AppStore',
						fr_FR : 'Linphone sur l\'AppStore'
					},
					windows_phone : { // AppleStore Store link
						en_US : 'Linphone on WindowsPhone Store',
						fr_FR : 'Linphone sur le Store WindowsPhone'
					}
				},
				title: {
					en_US : 'Welcome',
					fr_FR : 'Bienvenue'
				}
			},
			settings: {
				media: {
					title: {
						en_US : 'Settings',
						fr_FR : 'Options'
					},
					devices: {
						play: {
							en_US : 'Play',
							fr_FR : 'Lecture'
						},
						record: {
							en_US : 'Record',
							fr_FR : 'Enregistrement'
						},
						ring: {
							en_US : 'Ring',
							fr_FR : 'Sonnerie'
						},
						video: {
							en_US : 'Video',
							fr_FR : 'Vidéo'
						}
					}
				}
			}
		}
	},
	errors: {
		core: {
			1: {
				en_US : 'Invalid version of Linphone',
				fr_FR : 'Version invalide de Linphone'
			}
		},
		exception: {
			unhandled: {
				en_US : 'Unhandle error',
				fr_FR : 'Erreur inattendue'
			}
		}
	},
	global: {
		cancel: {
			en_US : 'Cancel',
			fr_FR : 'Annuler'
		},
		errors: {
			call: {
				request_timeout: {
					en_US : 'Request timeout',
					fr_FR : 'Temps d’attente d\'une réponse du serveur écoulé'
				},
				unknown: {
					en_US : 'Unknown error',
					fr_FR : 'Erreur inconnue'
				},
				busy_here: {
					en_US : 'The user "%1" is busy',
					fr_FR : 'L\'utilisateur "%1" est occupé'
				},
				not_found: {
					en_US : 'The user "%1" is not found',
					fr_FR : 'L\'utilisateur "%1" n\'a pas été trouvé'
				},
				not_acceptable_here: {
					en_US : 'Incompatible media parameters',
					fr_FR : 'Paramètres medias incompatibles'
				}
			},
			uri: {
				misformatted: {
					en_US : 'The provided address is not a valid SIP URI',
					fr_FR : 'L\'adresse fournie n\'est pas une URI SIP'
				}
			}
		},
		off: {
			en_US : 'Off',
			fr_FR : 'Non'
		},
		ok: {
			en_US : 'Ok',
			fr_FR : 'Ok'
		},
		on: {
			en_US : 'On',
			fr_FR : 'Oui'
		},
		save: {
			en_US : 'Save',
			fr_FR : 'Enregistrer'
		},
		status: {
			Appointment: {
				en_US : 'Appointment',
				fr_FR : 'En rendez-vous'
			},
			Away: {
				en_US : 'Away',
				fr_FR : 'Absent'
			},
			Breakfast: {
				en_US : 'Breakfast',
				fr_FR : ''
			},
			Busy: {
				en_US : 'Busy',
				fr_FR : 'Occupé'
			},
			Dinner: {
				en_US : 'Dinner',
				fr_FR : ''
			},
			Holiday: {
				en_US : 'Holiday',
				fr_FR : ''
			},
			InTransit: {
				en_US : 'In transit',
				fr_FR : ''
			},
			LookingForWork: {
				en_US : 'Looking for work',
				fr_FR : ''
			},
			Lunch: {
				en_US : 'Lunch',
				fr_FR : 'A table'
			},
			Meal: {
				en_US : 'Meal',
				fr_FR : ''
			},
			Meeting: {
				en_US : 'Meeting',
				fr_FR : 'En réunion'
			},
			Offline: {
				en_US : 'Offline',
				fr_FR : 'Hors ligne'
			},
			Online: {
				en_US : 'Online',
				fr_FR : 'Disponible'
			},
			OnThePhone: {
				en_US : 'On the phone',
				fr_FR : 'Au téléphone'
			},
			Other: {
				en_US : 'Other',
				fr_FR : 'Autre'
			},
			Performance: {
				en_US : 'Performance',
				fr_FR : ''
			},
			PermanentAbsence: {
				en_US : 'PermanentAbsence',
				fr_FR : ''
			},
			Playing: {
				en_US : 'Playing',
				fr_FR : ''
			},
			Presentation: {
				en_US : 'Presentation',
				fr_FR : ''
			},
			Shopping: {
				en_US : 'Shopping',
				fr_FR : ''
			},
			Sleeping: {
				en_US : 'Sleeping',
				fr_FR : ''
			},
			Spectator: {
				en_US : 'Spectator',
				fr_FR : ''
			},
			Steering: {
				en_US : 'Steering',
				fr_FR : ''
			},
			Travel: {
				en_US : 'Travel',
				fr_FR : ''
			},
			TV: {
				en_US : 'TV',
				fr_FR : ''
			},
			Unknown: {
				en_US : 'Unknown',
				fr_FR : ''
			},
			Vacation: {
				en_US : 'Vacation',
				fr_FR : ''
			},
			Working: {
				en_US : 'Working',
				fr_FR : ''
			},
			Worship: {
				en_US : 'Worship',
				fr_FR : ''
			}
		},
		stringFormat: {
			duration: {
				en_US : '(HH:)mm:ss',
				fr_FR : '(HH:)mm:ss'
			},
			time: {
				en_US : 'MM/dd/yyyy, HH:mm',
				fr_FR : 'dd/MM/yyyy, HH:mm'
			}
		},
		transports: {
			tcp: {
				en_US : 'TCP',
				fr_FR : 'TCP'
			},
			tls: {
				en_US : 'TLS',
				fr_FR : 'TLS'
			},
			udp: {
				en_US : 'UDP',
				fr_FR : 'UDP'
			}
		},
		unknown: {
			en_US : 'Unknown',
			fr_FR : 'Inconnu'
		}
	},
	header: {
		navigation: {
			about: {
				en_US : 'About',
				fr_FR : 'À Propos'
			},
			help: {
				en_US : 'Help',
				fr_FR : 'Aide'
			},
			settings: {
				en_US : 'Settings',
				fr_FR : 'Options'
			}
		},
		offline: {
			title: {
				en_US : 'You are not connected to Internet.',
				fr_FR : 'Vous n\'êtes pas connecté à Internet.'	
			}
		},
		profile: {
			disconnect: {
				en_US : 'Disconnect',
				fr_FR : 'Déconnexion'
			}
		}
	}
};
