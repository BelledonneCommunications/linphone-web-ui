/*globals linphone*/

linphone.ui.i18n = {
	errors : {
		core : {
			1 : {
				en_US : 'Invalid version of Linphone',
				fr_FR : 'Version invalide de Linphone'
			},
			2 : {
				en_US : 'Another instance of Linphone Web is started. Close it',
				fr_FR : 'Une autre instance de de Linphone Web est démarré. Veuillez fermer celle-ci.'
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
		save: {
			en_US : 'Save',
			fr_FR : 'Enregistrer'
		},
		cancel: {
			en_US : 'Cancel',
			fr_FR : 'Annuler'
		},
		on: {
			en_US : 'On',
			fr_FR : 'Oui'
		},
		off: {
			en_US : 'Off',
			fr_FR : 'Non'
		},
		ok: {
			en_US : 'Ok',
			fr_FR : 'Ok'
		},
		transports: {
			udp: {
				en_US : 'UDP',
				fr_FR : 'UDP'
			},
			tcp: {
				en_US : 'TCP',
				fr_FR : 'TCP'
			},
			tls: {
				en_US : 'TLS',
				fr_FR : 'TLS'
			}
		},
		status: {
			online: {
				en_US : 'Online',
				fr_FR : 'Disponible'
			},
			busy: {
				en_US : 'Busy',
				fr_FR : 'Occupé'
			},
			away: {
				en_US : 'Away',
				fr_FR : 'Absent'
			},
			offline: {
				en_US : 'Offline',
				fr_FR : 'Déconnecté'
			}
		}
	},
	header: {
		navigation: {
			settings: {
				en_US : 'Settings',
				fr_FR : 'Options'
			},
			help: {
				en_US : 'Help',
				fr_FR : 'Aide'
			},
			about: {
				en_US : 'About',
				fr_FR : 'À Propos'
			}
		},
		profile: {
			disconnect: {
				en_US : 'Disconnect',
				fr_FR : 'Déconnexion'
			}
		}
	},
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
			contacts: {
					en_US : 'Contacts',
					fr_FR : 'Contacts'
			},
			history: {
					en_US : 'History',
					fr_FR : 'Historique'
			},
			calls: {
					en_US : 'Calls',
					fr_FR : 'Appels'
			},
			chats: {
					en_US : 'Chats',
					fr_FR : 'Chats'
			}
		},
		view: {
			plugin: {
				title: {
					en_US : 'Welcome',
					fr_FR : 'Bienvenue'
				},
				text: {
					download : { // No automatic plugin intallation
						en_US : 'The plugin is not installed. Please download it using the following button.',
						fr_FR : 'Le plugin n\'est pas installé. Veuillez le télécharger en utilisant le bouton suivant.'
					},
					auto : { // Automatic plugin installation
						en_US : 'The plugin is not installed. Please wait and accept the automatic install of the plugin.',
						fr_FR : 'Le plugin n\'est pas installé. Veuillez attendre et accepter l\'installation automatique du plugin.'
					},
					auto_or_update : { // With IE, we can not detect the current version without issue (javascript caching)
						en_US : 'The plugin is not installed or updated. Please wait and accept the automatic install of the plugin.',
						fr_FR : 'Le plugin n\'est pas installé ou pas à jour. Veuillez attendre et accepter l\'installation automatique du plugin.'
					},
					outdated_download : { // No automatic plugin update
						en_US : 'The plugin is outdated. Please download it using the following button.',
						fr_FR : 'Le plugin n\'est pas à jour. Veuillez accepter l\'installation automatique du plugin.'
					},
					outdated_auto : { // Automatic plugin update
						en_US : 'The plugin is outdated. Please wait and accept the automatic install of the plugin.',
						fr_FR : 'Le plugin n\'est pas à jour. Veuillez attendre et accepter l\'installation automatique du plugin.'
					}
				},
				reload: {
					en_US : 'Reload',
					fr_FR : 'Recharger'
				},
				download: {
					en_US : 'Download',
					fr_FR : 'Télécharger'
				}
			},
			login: {
				title: {
					en_US : 'Welcome',
					fr_FR : 'Bienvenue'
				},
				login: {
					en_US : 'Login',
					fr_FR : 'S\'enregister'
				},
				create: {
					en_US : 'Create Linphone account',
					fr_FR : 'Créer un compte Linphone'
				},
				advanced: {
					en_US : 'Advanced settings',
					fr_FR : 'Options avancées'
				},
				accountSimple: {
					account: {
						en_US : 'Linphone Account',
						fr_FR : 'Compte Linphone'
					},
					password: {
						en_US : 'Password',
						fr_FR : 'Mot de passe'
					}
				},
				accountAdvanced: {
					account: {
						en_US : 'Account',
						fr_FR : 'Compte'
					},
					password: {
						en_US : 'Password',
						fr_FR : 'Mot de passe'
					},
					proxy: {
						en_US : 'Proxy',
						fr_FR : 'Proxy'
					},
					outband_proxy: {
						en_US : 'Outband proxy',
						fr_FR : 'Proxy sortant'
					},
					transport: {
						en_US : 'Transport',
						fr_FR : 'Transport'
					}
				}
			},
			history: {
				filter: {
					all: {
						en_US : 'All',
						fr_FR : 'Tous'
					},
					incoming: {
						en_US : 'Incomings',
						fr_FR : 'Entrants'
					},
					outgoing: {
						en_US : 'Outgoings',
						fr_FR : 'Sortants'
					},
					miss: {
						en_US : 'Miss',
						fr_FR : 'Manqués'
					}
				},
				modify: {
					en_US : 'Modify history',
					fr_FR : 'Modifier l\'historique'
				}
			},
			contacts: {
				filter: {
					all: {
						en_US : 'All',
						fr_FR : 'Tous'
					},
					online: {
						en_US : 'Online',
						fr_FR : 'Disponible'
					}
				},
				add: {
					en_US : 'Add a contact',
					fr_FR : 'Ajouter un contact'
				}
			},
			contact: {
				remove: {
					en_US : 'Remove contact',
					fr_FR : 'Supprimer le contact'
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
						ring: {
							en_US : 'Ring',
							fr_FR : 'Sonnerie'
						},
						record: {
							en_US : 'Record',
							fr_FR : 'Enregistrement'
						},
						video: {
							en_US : 'Video',
							fr_FR : 'Vidéo'
						}
					}
				}
			},
			call: {
				pause: {
					en_US : 'Pause',
					fr_FR : 'Pause'
				},
				conference: {
					en_US : 'Conference',
					fr_FR : 'Conférence'
				},
				video: {
					en_US : 'Video',
					fr_FR : 'Vidéo'
				},
				micro: {
					en_US : 'Micro',
					fr_FR : 'Micro'
				}
			},
			conference: {
				pause: {
					en_US : 'Pause',
					fr_FR : 'Pause'
				},
				conference: {
					en_US : 'Conference',
					fr_FR : 'Conférence'
				},
				video: {
					en_US : 'Video',
					fr_FR : 'Vidéo'
				},
				micro: {
					en_US : 'Micro',
					fr_FR : 'Micro'
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
			}
		}
	}
};
