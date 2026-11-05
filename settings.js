export const VIH_SETTINGS = {
    // 1. Kategorier med stabil key og redigerbart visningsnavn (name)
    categories: {
        "bold": { name: "Bold & Holdspil", color: "#1d4ed8", textColor: "#ffffff" },
        "fitness": { name: "Fitness & Styrke", color: "#ea580c", textColor: "#ffffff" },
        "endurance": { name: "Endurance", color: "#f11409", textColor: "#ffffff" },
        "outdoor": { name: "Outdoor & Adventure", color: "#15803d", textColor: "#ffffff" },
        "psykologi": { name: "Psykologi & Velvære", color: "#7e22ce", textColor: "#ffffff" },
        "ledelse": { name: "Uddannelse & Ledelse", color: "#ca8a04", textColor: "#000000" },
        "almen": { name: "Almen & Samfund", color: "#0f766e", textColor: "#ffffff" },
        "kreativ": { name: "Kreative Fag", color: "#546c6a", textColor: "#ffffff" },
        "musik": { name: "Musik", color: "#bb2adb", textColor: "#ffffff" },
    },

    // 2. Lokaler med farvekodning til lokaleoversigten
    roomGroups: [
        {
            groupName: "Haller & Boldbaner",
            borderColor: "#2563eb",
            rooms: ["Hal", "Multihal", "Græsbane", "Wembley", "Padelcenter"]
        },
        {
            groupName: "Fitness & Fysisk Træning",
            borderColor: "#c026d3",
            rooms: ["Styrke", "Dansesal", "Holdtræning", "Spinning", "Testcenter"]
        },
        {
            groupName: "Løb & Træningsstativ",
            borderColor: "#ca8a04",
            rooms: ["Løbebane", "Træningsstativ"]
        },
        {
            groupName: "Outdoor, Vand & Natur",
            borderColor: "#16a34a",
            rooms: ["MTB", "Klatrevæg", "Friluftsbassin", "Strand", "Udendørs", "Kajakker", "Madroen"]
        },
        {
            groupName: "Teori & Undervisningslokaler",
            borderColor: "#0284c7",
            rooms: ["Teori 1", "Teori 2", "Teori 3", "Teori 4", "Teori 5", "Havestuen"]
        },
        {
            groupName: "Kreativitet, Kultur & Velvære",
            borderColor: "#d97706",
            rooms: ["Musiklokale", "Køkkenet", "Sauna"]
        }
    ],

    // 3. Skemastruktur (Rækker og slots)
    scheduleRows: [
        {
            id: "idraet1",
            title: "Idræt 1",
            sub: "",
            slots: [
                { id: "idraet1_e1", title: "Efterår 1 (Aug - Okt)", season: "Efterår", span: 2 },
                { id: "idraet1_e2", title: "Efterår 2 (Okt - Dec)", season: "Efterår", span: 2 },
                { id: "idraet1_f1", title: "Forår 1 (Jan - Feb)", season: "Forår", span: 2, isFirstSpring: true },
                { id: "idraet1_f2", title: "Forår 2 (Mar - Maj)", season: "Forår", span: 2 },
                { id: "idraet1_f3", title: "Forår 3 (Maj - Jun)", season: "Forår", span: 2 }
            ]
        },
        {
            id: "idraet2",
            title: "Idræt 2",
            sub: "",
            slots: [
                { id: "idraet2_e1", title: "Efterår 1 (Aug - Okt)", season: "Efterår", span: 2 },
                { id: "idraet2_e2", title: "Efterår 2 (Okt - Dec)", season: "Efterår", span: 2 },
                { id: "idraet2_f1", title: "Forår 1 (Jan - Feb)", season: "Forår", span: 2, isFirstSpring: true },
                { id: "idraet2_f2", title: "Forår 2 (Mar - Maj)", season: "Forår", span: 2 },
                { id: "idraet2_f3", title: "Forår 3 (Maj - Jun)", season: "Forår", span: 2 }
            ]
        },
        {
            id: "kompetence",
            title: "Kompetencefag",
            sub: "",
            slots: [
                { id: "kompetence_e1", title: "Efterår 1 (Aug - Okt)", season: "Efterår", span: 2 },
                { id: "kompetence_e2", title: "Efterår 2 (Okt - Dec)", season: "Efterår", span: 2 },
                { id: "kompetence_f1", title: "Forår 1 (Jan - Mar)", season: "Forår", span: 3, isFirstSpring: true },
                { id: "kompetence_f2", title: "Forår 2 (Mar - Jun)", season: "Forår", span: 3 }
            ]
        },
        {
            id: "inspiration",
            title: "Inspirationsfag",
            sub: "",
            slots: [
                { id: "inspiration_e1", title: "Efterår 1 (Aug - Okt)", season: "Efterår", span: 2 },
                { id: "inspiration_e2", title: "Efterår 2 (Okt - Dec)", season: "Efterår", span: 2 },
                { id: "inspiration_f1", title: "Forår 1 (Jan - Mar)", season: "Forår", span: 3, isFirstSpring: true },
                { id: "inspiration_f2", title: "Forår 2 (Mar - Jun)", season: "Forår", span: 3 }
            ]
        }
    ],

    // 4. Det nøjagtige udbud af fag pr. blok og periode (nu med category keys)
    offerings: {
        // IDRÆT 1
        "idraet1_e1": [
            { id: "i1_e1_haandbold", name: "Håndbold 🤾", category: "bold", location: "Hal" },
            { id: "i1_e1_bold360", name: "Bold 360 ⚽🏀", category: "bold", location: "Multihal" },
            { id: "i1_e1_fodbold", name: "Fodbold ⚽", category: "bold", location: "Græsbane" },
            { id: "i1_e1_padel", name: "Padel 🎾", category: "bold", location: "Padelcenter" },
            { id: "i1_e1_cali", name: "Styrke & Calisthenics", category: "fitness", location: "Styrke" },
            { id: "i1_e1_fit360", name: "Fitness 360° 😅", category: "fitness", location: "Dansesal" },
            { id: "i1_e1_yoga", name: "Yoga - Hatha, Aerial & Akro 🧘", category: "psykologi", location: "Holdtræning" },
            { id: "i1_e1_cops", name: "COPS - Polititræning 👮", category: "fitness", location: "Løbebane" },
            { id: "i1_e1_adv", name: "Adventurerace 🗺️", category: "outdoor", location: "MTB" },
            { id: "i1_e1_surf", name: "YoSurf'n'Climb 🏄", category: "outdoor", location: "Klatrevæg" },
            { id: "i1_e1_bootcamp", name: "Bootcamp 🥵", category: "fitness", location: "Udendørs" }
        ],
        "idraet1_e2": [
            { id: "i1_e2_haandbold", name: "Håndbold 🤾", category: "bold", location: "Hal" },
            { id: "i1_e2_basket", name: "Basketball 🏀", category: "bold", location: "Multihal" },
            { id: "i1_e2_fodbold_pige", name: "Fodbold & Pigefodbold ⚽", category: "bold", location: "Wembley" },
            { id: "i1_e2_padel", name: "Padel 🎾", category: "bold", location: "Padelcenter" },
            { id: "i1_e2_styrke", name: "Styrketræning 💪", category: "fitness", location: "Styrke" },
            { id: "i1_e2_cardio", name: "Cardio Attack ❤️", category: "fitness", location: "Dansesal" },
            { id: "i1_e2_functional", name: "Functional Training 😅", category: "fitness", location: "Holdtræning" },
            { id: "i1_e2_bike", name: "Indoor Bike Xperience 🚴", category: "fitness", location: "Spinning" },
            { id: "i1_e2_loeb", name: "Løb & Løbetræning 👟", category: "endurance", location: "Løbebane" }
        ],
        "idraet1_f1": [
            { id: "i1_f1_haandbold", name: "Håndbold 🤾", category: "bold", location: "Hal" },
            { id: "i1_f1_multisport", name: "Multisport ♟️", category: "bold", location: "Multihal" },
            { id: "i1_f1_fodbold", name: "Fodbold ⚽", category: "bold", location: "Wembley" },
            { id: "i1_f1_padel", name: "Padel 🎾", category: "bold", location: "Padelcenter" },
            { id: "i1_f1_styrke", name: "Styrketræning 💪", category: "fitness", location: "Styrke" },
            { id: "i1_f1_fit360", name: "Fitness 360° 😅", category: "fitness", location: "Dansesal" },
            { id: "i1_f1_yoga", name: "Yoga - Hatha, Aerial & Akro 🧘", category: "psykologi", location: "Holdtræning" },
            { id: "i1_f1_bike", name: "Indoor Bike Xperience 🚴", category: "fitness", location: "Spinning" },
            { id: "i1_f1_loeb", name: "Løb & Løbetræning 👟", category: "endurance", location: "Løbebane" }
        ],
        "idraet1_f2": [
            { id: "i1_f2_haandbold", name: "Håndbold 🤾", category: "bold", location: "Hal" },
            { id: "i1_f2_basket", name: "Basketball 🏀", category: "bold", location: "Multihal" },
            { id: "i1_f2_fodbold_pige", name: "Fodbold & Pigefodbold ⚽", category: "bold", location: "Græsbane" },
            { id: "i1_f2_power", name: "Styrke & Power Performance", category: "fitness", location: "Styrke" },
            { id: "i1_f2_cardio", name: "Cardio Attack ❤️", category: "fitness", location: "Dansesal" },
            { id: "i1_f2_balance", name: "Balanced Body & Movement", category: "psykologi", location: "Holdtræning" },
            { id: "i1_f2_cops", name: "COPS - Polititræning 👮", category: "fitness", location: "Løbebane" },
            { id: "i1_f2_adv", name: "Adventurerace 🗺️", category: "outdoor", location: "MTB" },
            { id: "i1_f2_loeb", name: "Løb & Løbetræning 👟", category: "endurance", location: "Udendørs" }
        ],
        "idraet1_f3": [
            { id: "i1_f3_bold360", name: "Bold 360 ⚽🏀", category: "bold", location: "Hal" },
            { id: "i1_f3_basket", name: "Basketball 🏀", category: "bold", location: "Multihal" },
            { id: "i1_f3_fodbold", name: "Fodbold ⚽", category: "bold", location: "Græsbane" },
            { id: "i1_f3_padel", name: "Padel 🎾", category: "bold", location: "Padelcenter" },
            { id: "i1_f3_cali", name: "Styrke & Calisthenics", category: "fitness", location: "Styrke" },
            { id: "i1_f3_functional", name: "Functional Training 😅", category: "fitness", location: "Holdtræning" },
            { id: "i1_f3_surf", name: "YoSurf'n'Climb 🏄", category: "outdoor", location: "Klatrevæg" },
            { id: "i1_f3_beach", name: "Beach Sport 🏖️", category: "outdoor", location: "Strand" },
            { id: "i1_f3_bootcamp", name: "Bootcamp 🥵", category: "fitness", location: "Udendørs" }
        ],

        // IDRÆT 2
        "idraet2_e1": [
            { id: "i2_e1_volley", name: "Volleyball & Beachvolley 🏐", category: "bold", location: "Hal" },
            { id: "i2_e1_ketsjer", name: "Ketsjer 360 🎾🏸", category: "bold", location: "Multihal" },
            { id: "i2_e1_fodbold_player", name: "Fodbold & Playertek ⚽", category: "bold", location: "Græsbane" },
            { id: "i2_e1_cross", name: "Crossfitness 🏋️", category: "fitness", location: "Styrke" },
            { id: "i2_e1_hold", name: "Fitness Holdtræning 🕺🏼", category: "fitness", location: "Holdtræning" },
            { id: "i2_e1_ocr", name: "OCR & Fun Run 🏃‍♂️", category: "fitness", location: "Træningsstativ" },
            { id: "i2_e1_adv360", name: "Adventure 360° 🧗", category: "outdoor", location: "MTB" },
            { id: "i2_e1_multisport", name: "Multisport ♟️", category: "bold", location: "Udendørs" },
            { id: "i2_e1_kajak", name: "Havkajak 🚣‍♀️", category: "outdoor", location: "Kajakker" }
        ],
        "idraet2_e2": [
            { id: "i2_e2_futsal", name: "Futsal ⚽", category: "bold", location: "Hal" },
            { id: "i2_e2_badminton", name: "Badminton & Racket Sports 🏸", category: "bold", location: "Multihal" },
            { id: "i2_e2_styrke", name: "Styrketræning 💪", category: "fitness", location: "Styrke" },
            { id: "i2_e2_fighter", name: "Fighter 🥷🏻", category: "fitness", location: "Dansesal" },
            { id: "i2_e2_dance", name: "Dance 🕺🏼", category: "fitness", location: "Holdtræning" },
            { id: "i2_e2_mtb", name: "Mountainbike 🚵", category: "outdoor", location: "MTB" },
            { id: "i2_e2_game", name: "Game changer 🎲", category: "outdoor", location: "Udendørs" },
            { id: "i2_e2_toughest", name: "Toughest 🧼", category: "fitness", location: "Udendørs" }
        ],
        "idraet2_f1": [
            { id: "i2_f1_futsal", name: "Futsal ⚽", category: "bold", location: "Hal" },
            { id: "i2_f1_badminton", name: "Badminton & Racket Sports 🏸", category: "bold", location: "Multihal" },
            { id: "i2_f1_cross", name: "Crossfitness 🏋️", category: "fitness", location: "Styrke" },
            { id: "i2_f1_powerfit", name: "Power Fitness 🏋️", category: "fitness", location: "Dansesal" },
            { id: "i2_f1_hold", name: "Fitness Holdtræning 🕺🏼", category: "fitness", location: "Holdtræning" },
            { id: "i2_f1_endurance", name: "Power Endurance Sport 🚴", category: "fitness", location: "Spinning" },
            { id: "i2_f1_adv360", name: "Adventure 360° 🧗", category: "outdoor", location: "MTB" },
            { id: "i2_f1_toughest", name: "Toughest 🧼", category: "fitness", location: "Udendørs" }
        ],
        "idraet2_f2": [
            { id: "i2_f2_volley", name: "Volleyball & Beachvolley 🏐", category: "bold", location: "Hal" },
            { id: "i2_f2_badminton", name: "Badminton & Racket Sports 🏸", category: "bold", location: "Multihal" },
            { id: "i2_f2_fodbold_player", name: "Fodbold & Playertek ⚽", category: "bold", location: "Græsbane" },
            { id: "i2_f2_styrke", name: "Styrketræning 💪", category: "fitness", location: "Styrke" },
            { id: "i2_f2_game", name: "Game changer 🎲", category: "outdoor", location: "Udendørs" },
            { id: "i2_f2_dance", name: "Dance 🕺🏼", category: "fitness", location: "Holdtræning" },
            { id: "i2_f2_ocr", name: "OCR & Fun Run 🏃‍♂️", category: "fitness", location: "Træningsstativ" },
            { id: "i2_f2_mtb", name: "Mountainbike 🚵", category: "outdoor", location: "MTB" },
            { id: "i2_f2_bike_fusion", name: "Bike Team Fusion 🚴", category: "fitness", location: "Udendørs" }
        ],
        "idraet2_f3": [
            { id: "i2_f3_volley", name: "Volleyball & Beachvolley 🏐", category: "bold", location: "Hal" },
            { id: "i2_f3_ketsjer", name: "Ketsjer 360 🎾🏸", category: "bold", location: "Multihal" },
            { id: "i2_f3_cross", name: "Crossfitness 🏋️", category: "fitness", location: "Styrke" },
            { id: "i2_f3_fighter", name: "Fighter 🥷🏻", category: "fitness", location: "Dansesal" },
            { id: "i2_f3_hold", name: "Fitness Holdtræning 🕺🏼", category: "fitness", location: "Holdtræning" },
            { id: "i2_f3_mtb", name: "Mountainbike 🚵", category: "outdoor", location: "MTB" },
            { id: "i2_f3_multisport", name: "Multisport ♟️", category: "bold", location: "Udendørs" },
            { id: "i2_f3_kajak", name: "Havkajak 🚣‍♀️", category: "outdoor", location: "Kajakker" }
        ],

        // KOMPETENCEFAG
        "kompetence_e1": [
            { id: "k_e1_politi", name: "Politi 👮", category: "ledelse", location: "Teori 3" },
            { id: "k_e1_fysio", name: "FysioFit & Test 🧑‍🔬", category: "fitness", location: "Testcenter" },
            { id: "k_e1_ernaering", name: "Ernæring & Forbrænding 🥕", category: "fitness", location: "Teori 1" },
            { id: "k_e1_psyko", name: "Sportspsykologi & Teamplayer 🤯", category: "psykologi", location: "Teori 2" },
            { id: "k_e1_friluft", name: "Friluftsliv 🌳", category: "outdoor", location: "Madroen" },
            { id: "k_e1_medier", name: "Medier & Kommunikation 🌳", category: "almen", location: "Teori 4" },
            { id: "k_e1_musik", name: "Musik 🎶", category: "musik", location: "Musiklokale" },
            { id: "k_e1_inter", name: "International Class 🏳️‍🌈", category: "almen", location: "Teori 5" }
        ],
        "kompetence_e2": [
            { id: "k_e2_fitinst", name: "Fitnessinstruktør 🏋️", category: "ledelse", location: "Styrkerum" },
            { id: "k_e2_test", name: "Test & Træning 🧑‍🔬", category: "fitness", location: "Testcenter" },
            { id: "k_e2_bodymind", name: "Body & Mind 😶‍🌫️", category: "psykologi", location: "Holdtræning" },
            { id: "k_e2_fodboldtr", name: "Fodboldtræner & Performance ⚽", category: "bold", location: "Teori 1" },
            { id: "k_e2_psyko", name: "Psykologi 🧠", category: "psykologi", location: "Teori 2" },
            { id: "k_e2_baal", name: "Bryg & Bål 🔥", category: "outdoor", location: "Madroen" },
            { id: "k_e2_musik", name: "Musik 🎶", category: "musik", location: "Musiklokale" },
            { id: "k_e2_journalistik", name: "Sportsjournalistik 🗒️", category: "almen", location: "Teori 4" },
            { id: "k_e2_leadership", name: "Leadership 🤝", category: "ledelse", location: "Teori 3" }
        ],
        "kompetence_f1": [
            { id: "k_f1_test", name: "Test & Træning 🧑‍🔬", category: "fitness", location: "Testcenter" },
            { id: "k_f1_ernaering", name: "Ernæring & Forbrænding 🥕", category: "fitness", location: "Teori 1" },
            { id: "k_f1_politi", name: "Politi 👮", category: "ledelse", location: "Teori 3" },
            { id: "k_f1_psyko", name: "Psykologi 🧠", category: "psykologi", location: "Teori 2" },
            { id: "k_f1_baal", name: "Bryg & Bål 🔥", category: "outdoor", location: "Madroen" },
            { id: "k_f1_musik", name: "Musik 🎶", category: "musik", location: "Musiklokale" },
            { id: "k_f1_journalistik", name: "Sportsjournalistik 🗒️", category: "almen", location: "Teori 4" },
            { id: "k_f1_event", name: "Event Maker 🎪", category: "ledelse", location: "Havestuen" },
            { id: "k_f1_inter", name: "International Class 🏳️‍🌈", category: "almen", location: "Teori 5" }
        ],
        "kompetence_f2": [
            { id: "k_f2_fitinst", name: "Fitnessinstruktør 🏋️", category: "ledelse", location: "Styrkerum" },
            { id: "k_f2_fodboldtr", name: "Fodboldtræner & Performance ⚽", category: "bold", location: "Teori 1" },
            { id: "k_f2_bodymind", name: "Body & Mind 😶‍🌫️", category: "psykologi", location: "Holdtræning" },
            { id: "k_f2_sportspsyko", name: "Sportspsykologi & Teamplayer 🤯", category: "psykologi", location: "Teori 2" },
            { id: "k_f2_power", name: "Personlig Power 🦸", category: "ledelse", location: "Teori 3" },
            { id: "k_f2_friluft", name: "Friluftsliv 🌳", category: "outdoor", location: "Madroen" },
            { id: "k_f2_musik", name: "Musik 🎶", category: "musik", location: "Musiklokale" },
            { id: "k_f2_medier", name: "Medier & Kommunikation 🗒️", category: "almen", location: "Teori 4" }
        ],

        // INSPIRATIONSFAG
        "inspiration_e1": [
            { id: "insp_e1_massage", name: "Sportsmassage 💆", category: "psykologi", location: "Teori 1" },
            { id: "insp_e1_krea", name: "Design 🎨", category: "kreativ", location: "Havestuen" },
            { id: "insp_e1_horisont", name: "Horisont 🎨", category: "almen", location: "Teori 2" }
        ],
        "inspiration_e2": [
            { id: "insp_e2_sauna", name: "Vinterbadning & Saunagus 🧖", category: "psykologi", location: "Sauna" },
            { id: "insp_e2_green", name: "Grøn Mad 🌱", category: "almen", location: "Køkkenet" },
            { id: "insp_e2_staafrem", name: "Stå Frem 🗣️", category: "ledelse", location: "Teori 2" },
            { id: "insp_e2_guitar", name: "Begynderguitar 🎸", category: "musik", location: "Musiklokale" },
            { id: "insp_e2_politi", name: "Politi 🎸", category: "almen", location: "Teori 1" }

        ],
        "inspiration_f1": [
            { id: "insp_f1_sauna", name: "Vinterbadning & Saunagus 🧖", category: "psykologi", location: "Sauna" },
            { id: "insp_f1_massage", name: "Sportsmassage 💆", category: "psykologi", location: "Teori 1" },
            { id: "insp_f1_salsa", name: "Dans & Salsa 💃", category: "fitness", location: "Dansesalen" },
            { id: "insp_e1_horisont", name: "Horisont 🎨", category: "almen", location: "Teori 2" }
        ],
        "inspiration_f2": [
            { id: "insp_f2_bush", name: "Knivværksted 🏕️", category: "outdoor", location: "Madroen" },
            { id: "insp_f2_keramik", name: "Keramik 🎨", category: "kreativ", location: "Havestuen" },
            { id: "insp_f2_sang", name: "Kor 🎤", category: "musik", location: "Musiklokale" },
            { id: "insp_f2_politi", name: "Politi 🎸", category: "ledelse", location: "Teori 1" }
      ]
    },

    // 5. Prototyper som fallback
    prototypes: []
};