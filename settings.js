export const VIH_SETTINGS = {
    // 1. Kategorier og deres farver
    categories: {
        "Bold & Boldspil": { color: "#1d4ed8", textColor: "#ffffff" },
        "Fitness & Styrke": { color: "#ea580c", textColor: "#ffffff" },
        "Outdoor & Adventure": { color: "#15803d", textColor: "#ffffff" },
        "Psykologi & Velvære": { color: "#7e22ce", textColor: "#ffffff" },
        "Uddannelse & Ledelse": { color: "#ca8a04", textColor: "#000000" },
        "Almen & Samfund": { color: "#0f766e", textColor: "#ffffff" }
    },

    // 2. Lokaler med farvekodning til lokaleoversigten (jfr. regnearket)
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
            rooms: ["Styrke", "Dansesal", "Holdtræning", "Spinning", "Testcenter", "PhysioFit Lab"]
        },
        {
            groupName: "Løb & Træningsstativ",
            borderColor: "#ca8a04",
            rooms: ["Løbebane", "Træningsstativ"]
        },
        {
            groupName: "Outdoor, Vand & Natur",
            borderColor: "#16a34a",
            rooms: ["MTB", "Klatrevæg", "Friluftsbassin", "Boards", "Strand", "Udendørs", "Kajakker", "Friluftsgården", "Skovsatellitten", "Bålpladsen", "Bålhytten", "Fjorden"]
        },
        {
            groupName: "Teori & Undervisningslokaler",
            borderColor: "#0284c7",
            rooms: ["Teorilokale 1", "Teorilokale 2", "Teorilokale 3", "Klasselokale", "Fællesrum"]
        },
        {
            groupName: "Kreativitet, Kultur & Velvære",
            borderColor: "#d97706",
            rooms: ["Musiklokale", "Musiksal", "Medierum", "Dramalokale", "Værksted", "Krealokale", "Køkkenet", "Behandlerrum", "Sauna / Kysten", "MTB Værksted"]
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

    // 4. Det nøjagtige udbud af fag pr. blok og periode (baseret på regnearket)
    offerings: {
        // IDRÆT 1
        "idraet1_e1": [
            { id: "i1_e1_haandbold", name: "Håndbold 🤾", category: "Bold & Boldspil", location: "Hal" },
            { id: "i1_e1_bold360", name: "Bold 360 ⚽🏀", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i1_e1_fodbold", name: "Fodbold ⚽", category: "Bold & Boldspil", location: "Græsbane" },
            { id: "i1_e1_padel", name: "Padel (+1000 DKK) 🎾", category: "Bold & Boldspil", location: "Padelcenter" },
            { id: "i1_e1_cali", name: "Styrke & Calisthenics", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i1_e1_fit360", name: "Fitness 360° 😅", category: "Fitness & Styrke", location: "Dansesal" },
            { id: "i1_e1_yoga", name: "Yoga - Hatha, Aerial & Akro 🧘", category: "Psykologi & Velvære", location: "Holdtræning" },
            { id: "i1_e1_cops", name: "COPS - Polititræning 👮", category: "Fitness & Styrke", location: "Løbebane" },
            { id: "i1_e1_adv", name: "Adventurerace 🗺️", category: "Outdoor & Adventure", location: "MTB" },
            { id: "i1_e1_surf", name: "YoSurf'n'Climb 🏄", category: "Outdoor & Adventure", location: "Klatrevæg" },
            { id: "i1_e1_bootcamp", name: "Bootcamp 🥵", category: "Fitness & Styrke", location: "Udendørs" }
        ],
        "idraet1_e2": [
            { id: "i1_e2_haandbold", name: "Håndbold 🤾", category: "Bold & Boldspil", location: "Hal" },
            { id: "i1_e2_basket", name: "Basketball 🏀", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i1_e2_fodbold_pige", name: "Fodbold & Pigefodbold ⚽", category: "Bold & Boldspil", location: "Wembley" },
            { id: "i1_e2_padel", name: "Padel (+1000 DKK) 🎾", category: "Bold & Boldspil", location: "Padelcenter" },
            { id: "i1_e2_styrke", name: "Styrketræning 💪", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i1_e2_cardio", name: "Cardio Attack ❤️", category: "Fitness & Styrke", location: "Dansesal" },
            { id: "i1_e2_functional", name: "Functional Training 😅", category: "Fitness & Styrke", location: "Holdtræning" },
            { id: "i1_e2_bike", name: "Indoor Bike Xperience 🚴", category: "Fitness & Styrke", location: "Spinning" },
            { id: "i1_e2_loeb", name: "Løb & Løbetræning 👟", category: "Fitness & Styrke", location: "Løbebane" }
        ],
        "idraet1_f1": [
            { id: "i1_f1_haandbold", name: "Håndbold 🤾", category: "Bold & Boldspil", location: "Hal" },
            { id: "i1_f1_multisport", name: "Multisport ♟️", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i1_f1_fodbold", name: "Fodbold ⚽", category: "Bold & Boldspil", location: "Wembley" },
            { id: "i1_f1_padel", name: "Padel (+1000 DKK) 🎾", category: "Bold & Boldspil", location: "Padelcenter" },
            { id: "i1_f1_styrke", name: "Styrketræning 💪", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i1_f1_fit360", name: "Fitness 360° 😅", category: "Fitness & Styrke", location: "Dansesal" },
            { id: "i1_f1_yoga", name: "Yoga - Hatha, Aerial & Akro 🧘", category: "Psykologi & Velvære", location: "Holdtræning" },
            { id: "i1_f1_bike", name: "Indoor Bike Xperience 🚴", category: "Fitness & Styrke", location: "Spinning" },
            { id: "i1_f1_loeb", name: "Løb & Løbetræning 👟", category: "Fitness & Styrke", location: "Løbebane" }
        ],
        "idraet1_f2": [
            { id: "i1_f2_haandbold", name: "Håndbold 🤾", category: "Bold & Boldspil", location: "Hal" },
            { id: "i1_f2_basket", name: "Basketball 🏀", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i1_f2_fodbold_pige", name: "Fodbold & Pigefodbold ⚽", category: "Bold & Boldspil", location: "Græsbane" },
            { id: "i1_f2_power", name: "Styrke & Power Performance", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i1_f2_cardio", name: "Cardio Attack ❤️", category: "Fitness & Styrke", location: "Dansesal" },
            { id: "i1_f2_balance", name: "Balanced Body & Movement", category: "Psykologi & Velvære", location: "Holdtræning" },
            { id: "i1_f2_cops", name: "COPS - Polititræning 👮", category: "Fitness & Styrke", location: "Løbebane" },
            { id: "i1_f2_adv", name: "Adventurerace 🗺️", category: "Outdoor & Adventure", location: "MTB" },
            { id: "i1_f2_loeb", name: "Løb & Løbetræning 👟", category: "Fitness & Styrke", location: "Udendørs" }
        ],
        "idraet1_f3": [
            { id: "i1_f3_bold360", name: "Bold 360 ⚽🏀", category: "Bold & Boldspil", location: "Hal" },
            { id: "i1_f3_basket", name: "Basketball 🏀", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i1_f3_fodbold", name: "Fodbold ⚽", category: "Bold & Boldspil", location: "Græsbane" },
            { id: "i1_f3_padel", name: "Padel (+1000 DKK) 🎾", category: "Bold & Boldspil", location: "Padelcenter" },
            { id: "i1_f3_cali", name: "Styrke & Calisthenics", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i1_f3_functional", name: "Functional Training 😅", category: "Fitness & Styrke", location: "Holdtræning" },
            { id: "i1_f3_surf", name: "YoSurf'n'Climb 🏄", category: "Outdoor & Adventure", location: "Klatrevæg" },
            { id: "i1_f3_beach", name: "Beach Sport 🏖️", category: "Outdoor & Adventure", location: "Strand" },
            { id: "i1_f3_bootcamp", name: "Bootcamp 🥵", category: "Fitness & Styrke", location: "Udendørs" }
        ],

        // IDRÆT 2
        "idraet2_e1": [
            { id: "i2_e1_volley", name: "Volleyball & Beachvolley 🏐", category: "Bold & Boldspil", location: "Hal" },
            { id: "i2_e1_ketsjer", name: "Ketsjer 360 🎾🏸", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i2_e1_fodbold_player", name: "Fodbold & Playertek ⚽", category: "Bold & Boldspil", location: "Græsbane" },
            { id: "i2_e1_cross", name: "Crossfitness 🏋️", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i2_e1_hold", name: "Fitness Holdtræning 🕺🏼", category: "Fitness & Styrke", location: "Holdtræning" },
            { id: "i2_e1_ocr", name: "OCR & Fun Run 🏃‍♂️", category: "Fitness & Styrke", location: "Træningsstativ" },
            { id: "i2_e1_adv360", name: "Adventure 360° 🧗", category: "Outdoor & Adventure", location: "MTB" },
            { id: "i2_e1_multisport", name: "Multisport ♟️", category: "Bold & Boldspil", location: "Udendørs" },
            { id: "i2_e1_kajak", name: "Havkajak 🚣‍♀️", category: "Outdoor & Adventure", location: "Kajakker" }
        ],
        "idraet2_e2": [
            { id: "i2_e2_futsal", name: "Futsal ⚽", category: "Bold & Boldspil", location: "Hal" },
            { id: "i2_e2_badminton", name: "Badminton & Racket Sports 🏸", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i2_e2_styrke", name: "Styrketræning 💪", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i2_e2_fighter", name: "Fighter 🥷🏻", category: "Fitness & Styrke", location: "Dansesal" },
            { id: "i2_e2_dance", name: "Dance 🕺🏼", category: "Fitness & Styrke", location: "Holdtræning" },
            { id: "i2_e2_mtb", name: "Mountainbike & Trail Surfing 🚵", category: "Outdoor & Adventure", location: "MTB" },
            { id: "i2_e2_game", name: "Game changer 🎲", category: "Outdoor & Adventure", location: "Friluftsbassin" },
            { id: "i2_e2_toughest", name: "Toughest 🧼", category: "Fitness & Styrke", location: "Udendørs" }
        ],
        "idraet2_f1": [
            { id: "i2_f1_futsal", name: "Futsal ⚽", category: "Bold & Boldspil", location: "Hal" },
            { id: "i2_f1_badminton", name: "Badminton & Racket Sports 🏸", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i2_f1_cross", name: "Crossfitness 🏋️", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i2_f1_powerfit", name: "Power Fitness 🏋️", category: "Fitness & Styrke", location: "Dansesal" },
            { id: "i2_f1_hold", name: "Fitness Holdtræning 🕺🏼", category: "Fitness & Styrke", location: "Holdtræning" },
            { id: "i2_f1_endurance", name: "Power Endurance Sport 🚴", category: "Fitness & Styrke", location: "Spinning" },
            { id: "i2_f1_adv360", name: "Adventure 360° 🧗", category: "Outdoor & Adventure", location: "MTB" },
            { id: "i2_f1_toughest", name: "Toughest 🧼", category: "Fitness & Styrke", location: "Udendørs" }
        ],
        "idraet2_f2": [
            { id: "i2_f2_volley", name: "Volleyball & Beachvolley 🏐", category: "Bold & Boldspil", location: "Hal" },
            { id: "i2_f2_badminton", name: "Badminton & Racket Sports 🏸", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i2_f2_fodbold_player", name: "Fodbold & Playertek ⚽", category: "Bold & Boldspil", location: "Græsbane" },
            { id: "i2_f2_styrke", name: "Styrketræning 💪", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i2_f2_game", name: "Game changer 🎲", category: "Outdoor & Adventure", location: "Dansesal" },
            { id: "i2_f2_dance", name: "Dance 🕺🏼", category: "Fitness & Styrke", location: "Holdtræning" },
            { id: "i2_f2_ocr", name: "OCR & Fun Run 🏃‍♂️", category: "Fitness & Styrke", location: "Træningsstativ" },
            { id: "i2_f2_mtb", name: "Mountainbike & Trail Surfing 🚵", category: "Outdoor & Adventure", location: "MTB" },
            { id: "i2_f2_bike_fusion", name: "Bike Team Fusion 🚴", category: "Fitness & Styrke", location: "Udendørs" }
        ],
        "idraet2_f3": [
            { id: "i2_f3_volley", name: "Volleyball & Beachvolley 🏐", category: "Bold & Boldspil", location: "Hal" },
            { id: "i2_f3_ketsjer", name: "Ketsjer 360 🎾🏸", category: "Bold & Boldspil", location: "Multihal" },
            { id: "i2_f3_cross", name: "Crossfitness 🏋️", category: "Fitness & Styrke", location: "Styrke" },
            { id: "i2_f3_fighter", name: "Fighter 🥷🏻", category: "Fitness & Styrke", location: "Dansesal" },
            { id: "i2_f3_hold", name: "Fitness Holdtræning 🕺🏼", category: "Fitness & Styrke", location: "Holdtræning" },
            { id: "i2_f3_mtb", name: "Mountainbike & Trail Surfing 🚵", category: "Outdoor & Adventure", location: "MTB" },
            { id: "i2_f3_multisport", name: "Multisport ♟️", category: "Bold & Boldspil", location: "Udendørs" },
            { id: "i2_f3_kajak", name: "Havkajak 🚣‍♀️", category: "Outdoor & Adventure", location: "Kajakker" }
        ],

        // KOMPETENCEFAG
        "kompetence_e1": [
            { id: "k_e1_politi", name: "Politi 👮", category: "Uddannelse & Ledelse", location: "Teorilokale 1" },
            { id: "k_e1_fysio", name: "FysioFit & Test 🧑‍🔬", category: "Fitness & Styrke", location: "PhysioFit Lab" },
            { id: "k_e1_ernaering", name: "Ernæring & Forbrænding 🥕", category: "Fitness & Styrke", location: "Teorilokale 2" },
            { id: "k_e1_psyko", name: "Sportspsykologi & Teamplayer 🤯", category: "Psykologi & Velvære", location: "Teorilokale 3" },
            { id: "k_e1_friluft", name: "Friluftsliv 🌳", category: "Outdoor & Adventure", location: "Friluftsgården" },
            { id: "k_e1_klatreinst", name: "Outdoor & Klatreinstruktør 🌳", category: "Outdoor & Adventure", location: "Klatrevæg" },
            { id: "k_e1_musik", name: "Musik 🎶", category: "Almen & Samfund", location: "Musiklokale" },
            { id: "k_e1_inter", name: "International Class 🏳️‍🌈", category: "Almen & Samfund", location: "Klasselokale" }
        ],
        "kompetence_e2": [
            { id: "k_e2_fitinst", name: "Fitnessinstruktør 🏋️", category: "Uddannelse & Ledelse", location: "PhysioFit Lab" },
            { id: "k_e2_test", name: "Test & Træning 🧑‍🔬", category: "Fitness & Styrke", location: "Testcenter" },
            { id: "k_e2_bodymind", name: "Body & Mind 😶‍🌫️", category: "Psykologi & Velvære", location: "Dansesal" },
            { id: "k_e2_fodboldtr", name: "Fodboldtræner & Performance ⚽", category: "Bold & Boldspil", location: "Teorilokale 1" },
            { id: "k_e2_psyko", name: "Psykologi 🧠", category: "Psykologi & Velvære", location: "Teorilokale 2" },
            { id: "k_e2_baal", name: "Bryg & Bål 🔥", category: "Outdoor & Adventure", location: "Bålpladsen" },
            { id: "k_e2_musik", name: "Musik 🎶", category: "Almen & Samfund", location: "Musiklokale" },
            { id: "k_e2_journalistik", name: "Sportsjournalistik 🗒️", category: "Almen & Samfund", location: "Medierum" },
            { id: "k_e2_leadership", name: "Leadership 🤝", category: "Uddannelse & Ledelse", location: "Teorilokale 3" }
        ],
        "kompetence_f1": [
            { id: "k_f1_test", name: "Test & Træning 🧑‍🔬", category: "Fitness & Styrke", location: "Testcenter" },
            { id: "k_f1_ernaering", name: "Ernæring & Forbrænding 🥕", category: "Fitness & Styrke", location: "Teorilokale 1" },
            { id: "k_f1_politi", name: "Politi 👮", category: "Uddannelse & Ledelse", location: "Teorilokale 2" },
            { id: "k_f1_psyko", name: "Psykologi 🧠", category: "Psykologi & Velvære", location: "Teorilokale 3" },
            { id: "k_f1_baal", name: "Bryg & Bål 🔥", category: "Outdoor & Adventure", location: "Bålpladsen" },
            { id: "k_f1_musik", name: "Musik 🎶", category: "Almen & Samfund", location: "Musiklokale" },
            { id: "k_f1_journalistik", name: "Sportsjournalistik 🗒️", category: "Almen & Samfund", location: "Medierum" },
            { id: "k_f1_event", name: "Event Maker 🎪", category: "Uddannelse & Ledelse", location: "Fællesrum" },
            { id: "k_f1_inter", name: "International Class 🏳️‍🌈", category: "Almen & Samfund", location: "Klasselokale" }
        ],
        "kompetence_f2": [
            { id: "k_f2_fitinst", name: "Fitnessinstruktør 🏋️", category: "Uddannelse & Ledelse", location: "PhysioFit Lab" },
            { id: "k_f2_fodboldtr", name: "Fodboldtræner & Performance ⚽", category: "Bold & Boldspil", location: "Teorilokale 1" },
            { id: "k_f2_bodymind", name: "Body & Mind 😶‍🌫️", category: "Psykologi & Velvære", location: "Dansesal" },
            { id: "k_f2_sportspsyko", name: "Sportspsykologi & Teamplayer 🤯", category: "Psykologi & Velvære", location: "Teorilokale 2" },
            { id: "k_f2_power", name: "Personlig Power 🦸", category: "Uddannelse & Ledelse", location: "Teorilokale 3" },
            { id: "k_f2_friluft", name: "Friluftsliv 🌳", category: "Outdoor & Adventure", location: "Friluftsgården" },
            { id: "k_f2_musik", name: "Musik 🎶", category: "Almen & Samfund", location: "Musiklokale" },
            { id: "k_f2_medier", name: "Medier & Kommunikation 🗒️", category: "Almen & Samfund", location: "Medierum" }
        ],

        // INSPIRATIONSFAG
        "inspiration_e1": [
            { id: "insp_e1_massage", name: "Sportsmassage 💆", category: "Psykologi & Velvære", location: "Behandlerrum" },
            { id: "insp_e1_krea", name: "Design 🎨", category: "Almen & Samfund", location: "Krealokale" }
        ],
        "inspiration_e2": [
            { id: "insp_e2_sauna", name: "Vinterbadning & Saunagus 🧖", category: "Psykologi & Velvære", location: "Sauna / Kysten" },
            { id: "insp_e2_green", name: "Grøn Mad 🌱", category: "Almen & Samfund", location: "Køkkenet" },
            { id: "insp_e2_staafrem", name: "Stå Frem 🗣️", category: "Uddannelse & Ledelse", location: "Dramalokale" },
            { id: "insp_e2_guitar", name: "Begynderguitar 🎸", category: "Almen & Samfund", location: "Musiksal" }
        ],
        "inspiration_f1": [
            { id: "insp_f1_sauna", name: "Vinterbadning & Saunagus 🧖", category: "Psykologi & Velvære", location: "Sauna / Kysten" },
            { id: "insp_f1_massage", name: "Sportsmassage 💆", category: "Psykologi & Velvære", location: "Behandlerrum" },
            { id: "insp_f1_salsa", name: "Dans & Salsa 💃", category: "Fitness & Styrke", location: "Dansesalen" }
        ],
        "inspiration_f2": [
            { id: "insp_f2_bush", name: "Knivværksted 🏕️", category: "Outdoor & Adventure", location: "Bålhytten" },
            { id: "insp_f2_keramik", name: "Keramik 🎨", category: "Almen & Samfund", location: "Krealokale" },
            { id: "insp_f2_sang", name: "Kor 🎤", category: "Almen & Samfund", location: "Musiksal" }
        ]
    },

    // 5. Prototyper
    prototypes: [
        {
            name: "Styrke- & Fitnessprofilen",
            selections: {
                "idraet1_e1": "i1_e1_cali", "idraet2_e1": "i2_e1_cross",
                "kompetence_e1": "k_e1_fysio", "inspiration_e1": "insp_e1_massage",
                "idraet1_e2": "i1_e2_styrke", "idraet2_e2": "i2_e2_fighter",
                "kompetence_e2": "k_e2_fitinst", "inspiration_e2": "insp_e2_sauna",
                "idraet1_f1": "i1_f1_styrke", "idraet2_f1": "i2_f1_cross",
                "idraet1_f2": "i1_f2_power", "idraet2_f2": "i2_f2_styrke",
                "idraet1_f3": "i1_f3_cali", "idraet2_f3": "i2_f3_cross",
                "kompetence_f1": "k_f1_test", "inspiration_f1": "insp_f1_massage",
                "kompetence_f2": "k_f2_fitinst", "inspiration_f2": "insp_f2_keramik"
            }
        },
        {
            name: "Outdoor- & Adventureprofilen",
            selections: {
                "idraet1_e1": "i1_e1_adv", "idraet2_e1": "i2_e1_kajak",
                "kompetence_e1": "k_e1_friluft", "inspiration_e1": "insp_e1_bush",
                "idraet1_e2": "i1_e2_haandbold", "idraet2_e2": "i2_e2_mtb",
                "kompetence_e2": "k_e2_baal", "inspiration_e2": "insp_e2_sauna",
                "idraet1_f1": "i1_f1_multisport", "idraet2_f1": "i2_f1_adv360",
                "idraet1_f2": "i1_f2_adv", "idraet2_f2": "i2_f2_mtb",
                "idraet1_f3": "i1_f3_surf", "idraet2_f3": "i2_f3_kajak",
                "kompetence_f1": "k_f1_mtbinst", "inspiration_f1": "insp_f1_sauna",
                "kompetence_f2": "k_f2_friluft", "inspiration_f2": "insp_f2_surf"
            }
        }
    ]
};