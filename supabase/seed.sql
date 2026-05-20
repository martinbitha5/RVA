-- ============================================================
-- Seed Data — Aéroport International de N'djili (FIH)
-- Données initiales réalistes pour FIH/FZAA, Kinshasa, RDC
-- ============================================================

-- ============================================================
-- DESTINATIONS
-- ============================================================
insert into public.destinations
  (iata_code, icao_code, city_fr, city_en, country_fr, country_en, country_code, continent, timezone, is_domestic, province_rdc)
values
  -- === DESTINATIONS INTÉRIEURES RDC ===
  ('FBM','FZQA','Lubumbashi','Lubumbashi','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Lubumbashi',true,'Lualaba'),
  ('GOM','FZNA','Goma','Goma','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Lubumbashi',true,'Nord-Kivu'),
  ('BKY','FZMA','Bukavu','Bukavu','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Lubumbashi',true,'Sud-Kivu'),
  ('MJM','FZWA','Mbuji-Mayi','Mbuji-Mayi','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Lubumbashi',true,'Kasaï-Oriental'),
  ('FKI','FZIA','Kisangani','Kisangani','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Lubumbashi',true,'Tshopo'),
  ('KGA','FZUA','Kananga','Kananga','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Lubumbashi',true,'Kasaï'),
  ('MNB','FZEA','Mbandaka','Mbandaka','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Kinshasa',true,'Équateur'),
  ('MAT','FZAM','Matadi','Matadi','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Kinshasa',true,'Kongo-Central'),
  ('BAN','FZAJ','Bandundu','Bandundu','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Kinshasa',true,'Kwilu'),
  ('GDJ','FZWC','Gandajika','Gandajika','République Démocratique du Congo','Democratic Republic of Congo','CD','Africa','Africa/Lubumbashi',true,'Kasaï-Oriental'),

  -- === AFRIQUE CENTRALE & SUBSAHARIENNE ===
  ('DLA','FKKD','Douala','Douala','Cameroun','Cameroon','CM','Africa','Africa/Douala',false,null),
  ('LBV','FOOL','Libreville','Libreville','Gabon','Gabon','GA','Africa','Africa/Libreville',false,null),
  ('COO','DBBB','Cotonou','Cotonou','Bénin','Benin','BJ','Africa','Africa/Porto-Novo',false,null),
  ('LFW','DXXX','Lomé','Lomé','Togo','Togo','TG','Africa','Africa/Lome',false,null),
  ('LAD','FNLU','Luanda','Luanda','Angola','Angola','AO','Africa','Africa/Luanda',false,null),
  ('LUN','FLLS','Lusaka','Lusaka','Zambie','Zambia','ZM','Africa','Africa/Lusaka',false,null),
  ('HAR','FVHA','Harare','Harare','Zimbabwe','Zimbabwe','ZW','Africa','Africa/Harare',false,null),
  ('NBO','HKJK','Nairobi','Nairobi','Kenya','Kenya','KE','Africa','Africa/Nairobi',false,null),
  ('ADD','HAAB','Addis-Abeba','Addis Ababa','Éthiopie','Ethiopia','ET','Africa','Africa/Addis_Ababa',false,null),
  ('JNB','FAJS','Johannesburg','Johannesburg','Afrique du Sud','South Africa','ZA','Africa','Africa/Johannesburg',false,null),
  ('KGL','HRYR','Kigali','Kigali','Rwanda','Rwanda','RW','Africa','Africa/Kigali',false,null),
  ('ACC','DGAA','Accra','Accra','Ghana','Ghana','GH','Africa','Africa/Accra',false,null),
  ('ABJ','DIAP','Abidjan','Abidjan','Côte d''Ivoire','Côte d''Ivoire','CI','Africa','Africa/Abidjan',false,null),
  ('LOS','DNMM','Lagos','Lagos','Nigeria','Nigeria','NG','Africa','Africa/Lagos',false,null),
  ('DAR','HTDA','Dar es Salam','Dar es Salaam','Tanzanie','Tanzania','TZ','Africa','Africa/Dar_es_Salaam',false,null),
  ('ENT','FAEN','Entebbe','Entebbe','Ouganda','Uganda','UG','Africa','Africa/Kampala',false,null),
  ('CMN','GMMN','Casablanca','Casablanca','Maroc','Morocco','MA','Africa','Africa/Casablanca',false,null),
  ('TNR','FMMI','Antananarivo','Antananarivo','Madagascar','Madagascar','MG','Africa','Africa/Antananarivo',false,null),

  -- === MOYEN-ORIENT ===
  ('DOH','OTHH','Doha','Doha','Qatar','Qatar','QA','Asia','Asia/Qatar',false,null),
  ('DXB','OMDB','Dubaï','Dubai','Émirats arabes unis','United Arab Emirates','AE','Asia','Asia/Dubai',false,null),
  ('CAI','HECA','Le Caire','Cairo','Égypte','Egypt','EG','Africa','Africa/Cairo',false,null),
  ('IST','LTFM','Istanbul','Istanbul','Turquie','Turkey','TR','Europe','Europe/Istanbul',false,null),

  -- === EUROPE ===
  ('CDG','LFPG','Paris','Paris','France','France','FR','Europe','Europe/Paris',false,null),
  ('BRU','EBBR','Bruxelles','Brussels','Belgique','Belgium','BE','Europe','Europe/Brussels',false,null)
on conflict (iata_code) do nothing;

-- ============================================================
-- AIRLINES
-- ============================================================
insert into public.airlines
  (iata_code, icao_code, name, slug, website, description_fr, description_en,
   hub_at_fih, alliance, checkin_counter, active)
values
  ('C0','MCAW','Congo Airways','congo-airways',
   'https://www.congoairways.com',
   'Compagnie aérienne nationale de la République Démocratique du Congo, fondée en 2015. Opère des vols intérieurs et régionaux depuis FIH.',
   'National airline of the Democratic Republic of Congo, founded in 2015. Operates domestic and regional flights from FIH.',
   true,null,'Comptoirs 1-3, Terminal Domestique',true),

  ('BZ','FCBA','CAA — Compagnie Africaine d''Aviation','caa-compagnie-africaine-aviation',
   null,
   'Compagnie congolaise privée spécialisée dans les vols intérieurs en RDC, desservant les provinces les plus reculées.',
   'Congolese private airline specializing in domestic flights across DRC, serving the most remote provinces.',
   true,null,'Comptoirs 4-5, Terminal Domestique',true),

  ('ET','ETHI','Ethiopian Airlines','ethiopian-airlines',
   'https://www.ethiopianairlines.com',
   'La plus grande compagnie aérienne d''Afrique, membre de Star Alliance. Relie FIH à son hub d''Addis-Abeba avec correspondances mondiales.',
   'Africa''s largest airline and Star Alliance member. Connects FIH to its Addis Ababa hub with worldwide connections.',
   false,'Star Alliance','Comptoirs 16-18, Terminal International',true),

  ('SN','EBEJ','Brussels Airlines','brussels-airlines',
   'https://www.brusselsairlines.com',
   'Compagnie belge filiale de Lufthansa Group. Opère des vols directs Bruxelles–Kinshasa, lien historique avec la RDC depuis l''époque Sabena.',
   'Belgian airline, Lufthansa Group subsidiary. Operates direct Brussels–Kinshasa flights, maintaining a historic link with DRC since the Sabena era.',
   false,'Star Alliance','Comptoirs 19-20, Terminal International',true),

  ('AF','FRAF','Air France','air-france',
   'https://www.airfrance.fr',
   'Compagnie aérienne française, filiale d''Air France-KLM. Relie Paris-Charles de Gaulle à Kinshasa avec service premium.',
   'French airline, Air France-KLM subsidiary. Connects Paris-Charles de Gaulle to Kinshasa with premium service.',
   false,'SkyTeam','Comptoirs 21-22, Terminal International',true),

  ('KQ','HKCA','Kenya Airways','kenya-airways',
   'https://www.kenya-airways.com',
   'Compagnie aérienne nationale kenyane. Relie FIH à Nairobi avec correspondances vers l''Asie et l''Amérique via le hub de Nairobi.',
   'Kenya''s national airline. Connects FIH to Nairobi with connections to Asia and America via the Nairobi hub.',
   false,'SkyTeam','Comptoirs 23-24, Terminal International',true),

  ('QR','QATX','Qatar Airways','qatar-airways',
   'https://www.qatarairways.com',
   'Compagnie aérienne nationale du Qatar, 5 étoiles Skytrax. Relie FIH à Doha avec accès à plus de 160 destinations mondiales.',
   'Qatar''s national airline, 5-star Skytrax rated. Connects FIH to Doha with access to 160+ global destinations.',
   false,'oneworld','Comptoirs 25-26, Terminal International',true),

  ('MS','MSER','EgyptAir','egyptair',
   'https://www.egyptair.com',
   'Compagnie aérienne nationale égyptienne et membre de Star Alliance. Relie FIH au Caire avec correspondances vers l''Europe et le Moyen-Orient.',
   'Egypt''s national airline and Star Alliance member. Connects FIH to Cairo with connections to Europe and the Middle East.',
   false,'Star Alliance','Comptoirs 27-28, Terminal International',true),

  ('TK','THYF','Turkish Airlines','turkish-airlines',
   'https://www.turkishairlines.com',
   'La compagnie aérienne desservant le plus de pays au monde. Relie FIH à Istanbul avec correspondances vers 120+ pays.',
   'The world''s airline flying to the most countries. Connects FIH to Istanbul with connections to 120+ countries.',
   false,'Star Alliance','Comptoirs 29-30, Terminal International',true),

  ('KP','OSKY','ASKY Airlines','asky-airlines',
   'https://www.flyasky.com',
   'Compagnie aérienne panafricaine basée à Lomé. Dessert l''Afrique de l''Ouest et centrale depuis FIH.',
   'Pan-African airline based in Lomé. Serves West and Central Africa from FIH.',
   false,null,'Comptoirs 31-32, Terminal International',true),

  ('AT','MAAN','Royal Air Maroc','royal-air-maroc',
   'https://www.royalairmaroc.com',
   'Compagnie aérienne nationale marocaine, membre de oneworld. Relie FIH à Casablanca avec correspondances vers l''Europe et l''Amérique du Nord.',
   'Morocco''s national airline, oneworld member. Connects FIH to Casablanca with European and North American connections.',
   false,'oneworld','Comptoirs 33-34, Terminal International',true),

  ('WB','RWNF','RwandAir','rwandair',
   'https://www.rwandair.com',
   'Compagnie aérienne nationale rwandaise en pleine expansion. Relie FIH à Kigali, porte d''entrée vers l''Afrique de l''Est.',
   'Rwanda''s rapidly expanding national airline. Connects FIH to Kigali, gateway to East Africa.',
   false,null,'Comptoirs 35-36, Terminal International',true),

  ('SA','SAAF','South African Airways','south-african-airways',
   'https://www.flysaa.com',
   'Compagnie aérienne nationale sud-africaine. Relie FIH à Johannesburg, hub majeur d''Afrique australe.',
   'South Africa''s national airline. Connects FIH to Johannesburg, major hub of Southern Africa.',
   false,'Star Alliance','Comptoirs 37-38, Terminal International',true),

  ('DT','TAAG','TAAG Angola Airlines','taag-angola-airlines',
   'https://www.taag.com',
   'Compagnie aérienne nationale angolaise. Relie FIH à Luanda, voisine importante de la RDC.',
   'Angola''s national airline. Connects FIH to Luanda, an important DRC neighbor.',
   false,null,'Comptoirs 39-40, Terminal International',true),

  ('UR','UGAS','Uganda Airlines','uganda-airlines',
   'https://www.ugandaairlines.co.ug',
   'Compagnie aérienne nationale ougandaise relancée en 2019. Relie FIH à Entebbe.',
   'Uganda''s national airline, relaunched in 2019. Connects FIH to Entebbe.',
   false,null,'Comptoirs 41-42, Terminal International',true),

  ('HF','FROG','Air Côte d''Ivoire','air-cote-d-ivoire',
   'https://www.aircotedivoire.com',
   'Compagnie aérienne nationale ivoirienne. Relie FIH à Abidjan, capitale économique de l''Afrique de l''Ouest francophone.',
   'Ivory Coast''s national airline. Connects FIH to Abidjan, economic capital of Francophone West Africa.',
   false,null,'Comptoirs 43-44, Terminal International',true),

  ('TC','ATCX','Air Tanzania','air-tanzania',
   'https://www.airtanzania.co.tz',
   'Compagnie aérienne nationale tanzanienne. Relie FIH à Dar es Salam et Kilimanjaro.',
   'Tanzania''s national airline. Connects FIH to Dar es Salaam and Kilimanjaro.',
   false,null,'Comptoirs 45-46, Terminal International',true)
on conflict (iata_code) do nothing;

-- ============================================================
-- PARKING LOTS
-- ============================================================
insert into public.parking_lots
  (code, name, description_fr, description_en, total_spots, available_spots,
   hourly_rate_usd, daily_rate_usd, weekly_rate_usd, monthly_rate_usd,
   distance_terminal, shuttle_available, ev_charging, covered, pmr_spots,
   security_level, active)
values
  ('P1','Parking Court Terme — Terminal International',
   'Parking officiel RVA à 200m du terminal international. Idéal pour les dépose/récupération et les courtes durées. Accès immédiat au hall des arrivées.',
   'Official RVA parking 200m from the international terminal. Ideal for drop-offs and short stays. Direct access to arrivals hall.',
   350, 280, 2.00, 12.00, 60.00, 180.00,
   '200m du terminal international', false, false, false, 15, 'cctv_24h', true),

  ('P2','Parking Long Terme — Boulevard Lumumba',
   'Grand parking extérieur sécurisé sur le Boulevard Lumumba. Tarifs dégressifs pour les séjours longs. Service navette vers les terminaux toutes les 15 minutes.',
   'Large secured outdoor parking on Boulevard Lumumba. Decreasing rates for long stays. Shuttle service to terminals every 15 minutes.',
   800, 620, 1.00, 8.00, 40.00, 100.00,
   '600m des terminaux (navette gratuite)', true, false, false, 20, 'cctv_24h', true),

  ('P3','Parking Économique — Zone Est',
   'Option économique pour les passagers et les personnes venant accueillir des proches. Tarif journalier fixe avantageux.',
   'Budget option for passengers and greeters. Advantageous fixed daily rate.',
   500, 410, 0.50, 5.00, 25.00, 70.00,
   '800m du terminal international (navette)', true, false, false, 10, 'standard', true),

  ('PMR','Parking Mobilité Réduite — Accès Prioritaire',
   'Parking réservé aux personnes à mobilité réduite (badge PMR obligatoire). Emplacement le plus proche du terminal, rampes d''accès et ascenseurs.',
   'Parking reserved for people with reduced mobility (PMR badge required). Closest spots to the terminal, access ramps and elevators.',
   50, 42, 0.00, 0.00, 0.00, 0.00,
   '50m du terminal international', false, false, true, 50, 'cctv_24h', true)
on conflict (code) do nothing;

-- ============================================================
-- LOUNGES
-- ============================================================
insert into public.lounges
  (name, slug, operator, location, terminal, description_fr, description_en,
   access_conditions, access_fee_usd, amenities, active)
values
  ('Pearl Lounge','pearl-lounge','RVA — Régie des Voies Aériennes',
   'Niveau 2, Terminal International, après contrôle sécurité',
   'international',
   'Le salon premium de l''Aéroport International de N''djili. Espace de détente et de travail haut de gamme ouvert à tous les passagers moyennant frais d''accès. Wi-Fi haut débit, buffet congolais et international, bar.',
   'The premium lounge at N''djili International Airport. High-end relaxation and work space open to all passengers for an access fee. High-speed Wi-Fi, Congolese and international buffet, bar.',
   'Accès payant (30 USD) ou via carte Priority Pass, carte American Express Platinum, ou classe Business sur certaines compagnies.',
   30.00,
   '["wifi","food","bar","shower","prayer_room","business_center","tv"]',true),

  ('Brussels Airlines Business Lounge','brussels-airlines-lounge','Brussels Airlines',
   'Niveau 2, Terminal International, Zone Schengen',
   'international',
   'Salon exclusif Brussels Airlines réservé aux passagers Business Class et membres Gold/Platinum Miles & More sur les vols SN opérés depuis FIH.',
   'Exclusive Brussels Airlines lounge reserved for Business Class passengers and Gold/Platinum Miles & More members on SN flights from FIH.',
   'Passagers Brussels Airlines Business Class ou membres Miles & More statut Gold/Platinum.',
   null,
   '["wifi","food","bar","shower","business_center"]',true),

  ('Ethiopian Airlines Cloud Nine Lounge','ethiopian-cloud-nine-lounge','Ethiopian Airlines',
   'Niveau 2, Terminal International',
   'international',
   'Salon Ethiopian Airlines pour les passagers Cloud Nine et ShebaMiles Elite. Service de restauration africaine internationale.',
   'Ethiopian Airlines lounge for Cloud Nine and ShebaMiles Elite passengers. African and international dining service.',
   'Passagers Ethiopian Airlines Business Class et membres ShebaMiles Elite.',
   null,
   '["wifi","food","bar","shower"]',true),

  ('Qatar Airways Al Mourjan — Kinshasa','qatar-airways-lounge','Qatar Airways',
   'Niveau 2, Terminal International',
   'international',
   'Salon Qatar Airways pour les passagers Business Class et membres Privilege Club Platinum/Gold opérant via Doha.',
   'Qatar Airways lounge for Business Class passengers and Platinum/Gold Privilege Club members operating via Doha.',
   'Passagers Qatar Airways Business Class et membres Privilege Club Platinum/Gold.',
   null,
   '["wifi","food","bar","shower","spa_basic"]',true),

  ('Salon Turkish Airlines','turkish-airlines-lounge','Turkish Airlines',
   'Niveau 2, Terminal International',
   'international',
   'Salon Turkish Airlines pour les passagers Business Class et membres Miles & Smiles Elite.',
   'Turkish Airlines lounge for Business Class passengers and Miles & Smiles Elite members.',
   'Passagers Turkish Airlines Business Class et membres Miles & Smiles Elite.',
   null,
   '["wifi","food","bar","shower"]',true),

  ('Salon Air France','air-france-lounge','Air France',
   'Niveau 2, Terminal International',
   'international',
   'Salon Air France pour passagers La Première, Business et membres Flying Blue Platinum/Gold sur vols AF depuis FIH.',
   'Air France lounge for La Première, Business passengers and Flying Blue Platinum/Gold members on AF flights from FIH.',
   'Passagers Air France La Première / Business et membres Flying Blue Platinum/Gold.',
   null,
   '["wifi","food","bar","shower","business_center"]',true),

  ('Salon VIP Diplomatique','salon-vip-diplomatique','RVA — Régie des Voies Aériennes',
   'Niveau 1, Terminal International, Aile Nord',
   'international',
   'Salon réservé aux personnalités officielles, corps diplomatique et délégations gouvernementales. Accès sur invitation ou accréditation RVA.',
   'Lounge reserved for official personalities, diplomatic corps and government delegations. Access by invitation or RVA accreditation only.',
   'Sur invitation ou accréditation officielle RVA uniquement.',
   null,
   '["wifi","food","bar","meeting_room","vip_service"]',true),

  ('Kenya Airways Pride Lounge','kenya-airways-lounge','Kenya Airways',
   'Niveau 2, Terminal International',
   'international',
   'Salon Kenya Airways pour passagers Business Class et membres Flying Blue/Asante Elite sur les vols KQ depuis FIH.',
   'Kenya Airways lounge for Business Class passengers and Flying Blue/Asante Elite members on KQ flights from FIH.',
   'Passagers Kenya Airways Business Class et membres Asante Elite.',
   null,
   '["wifi","food","bar"]',true),

  ('Salon Transit International','salon-transit','RVA — Régie des Voies Aériennes',
   'Niveau 1, Terminal International, Zone de Transit',
   'international',
   'Espace de repos pour les passagers en correspondance. Accès automatique avec carte d''embarquement de transit valide.',
   'Rest area for connecting passengers. Automatic access with valid transit boarding pass.',
   'Passagers en transit avec correspondance confirmée.',
   null,
   '["wifi","seating","tv","vending_machines"]',true),

  ('Salon Domestique','salon-domestique','RVA — Régie des Voies Aériennes',
   'Niveau 1, Terminal Domestique',
   'domestic',
   'Espace de confort pour les passagers du terminal domestique. Idéal pour les voyageurs en attente de vols vers Lubumbashi, Goma, Kisangani et autres destinations intérieures.',
   'Comfort space for domestic terminal passengers. Ideal for travelers awaiting flights to Lubumbashi, Goma, Kisangani and other domestic destinations.',
   'Passagers avec billet domestique valide. Accès payant (10 USD).',
   10.00,
   '["wifi","food","bar","tv"]',true)
on conflict (slug) do nothing;

-- ============================================================
-- CONCESSIONS (20 établissements)
-- ============================================================
insert into public.concessions
  (name, slug, category, terminal, zone, description_fr, description_en, active)
values
  ('Chez Mama Weza','chez-mama-weza','restaurant','international','after_security',
   'Restaurant congolais authentique proposant le meilleur de la cuisine kinoise : poulet moambé, fumbwa, maboke de capitaine du fleuve Congo et plats végétariens à base de pondu.',
   'Authentic Congolese restaurant offering the best of Kinshasa cuisine: poulet moambé, fumbwa, Congo River Captain maboke and vegetarian dishes with pondu.',true),

  ('Le Comptoir du Fleuve','le-comptoir-du-fleuve','restaurant','international','after_security',
   'Brasserie internationale avec vue sur les pistes. Menu varié : cuisine africaine, européenne et plats du jour. Petit-déjeuner dès 5h30.',
   'International brasserie with runway views. Varied menu: African, European cuisine and daily specials. Breakfast from 5:30am.',true),

  ('FIH Fast Food','fih-fast-food','restaurant','both','both',
   'Restauration rapide congolaise et internationale. Brochettes, frites, sandwichs, jus de fruits frais tropicaux (maracuja, mangue, corossol).',
   'Congolese and international fast food. Brochettes, fries, sandwiches, fresh tropical fruit juices (passion fruit, mango, soursop).',true),

  ('Café Kivu','cafe-kivu','cafe','international','after_security',
   'Café spécialisé dans le café arabica du Kivu, l''un des meilleurs cafés d''Afrique. Également thés, pâtisseries maison et viennoiseries.',
   'Café specializing in Kivu arabica coffee, one of Africa''s finest. Also teas, homemade pastries and pastries.',true),

  ('Saveurs d''Afrique','saveurs-d-afrique','restaurant','domestic','after_security',
   'Restaurant du terminal domestique proposant des spécialités de toutes les provinces de la RDC : cuisine Katangaise, Kasaïenne, Equatoriale.',
   'Domestic terminal restaurant offering specialties from all DRC provinces: Katanga, Kasai, Equatorial cuisines.',true),

  ('Duty Free FIH','duty-free-fih','duty_free','international','after_security',
   'Boutique hors taxes officielle : spiritueux, parfums, cosmétiques, tabac, confiseries, souvenirs premium RDC. Paiement en USD, EUR et CDF.',
   'Official duty-free shop: spirits, perfumes, cosmetics, tobacco, confectionery, premium DRC souvenirs. Payment in USD, EUR and CDF.',true),

  ('Artisanat du Congo','artisanat-du-congo','boutique','both','both',
   'Galerie d''artisanat congolais authentique : masques Kuba, sculptures Luba, tissu Kuba, peintures de Chéri Samba et artistes kinois. Certificat d''authenticité fourni.',
   'Gallery of authentic Congolese crafts: Kuba masks, Luba sculptures, Kuba fabric, Chéri Samba paintings and Kinshasa artists. Certificate of authenticity provided.',true),

  ('Souvenirs Kinshasa','souvenirs-kinshasa','boutique','international','after_security',
   'Boutique souvenirs et presse internationale. Livres sur la RDC, magazines, souvenirs, T-shirts FIH, cartes postales de Kinshasa et du Fleuve Congo.',
   'Souvenir shop and international press. Books on DRC, magazines, souvenirs, FIH t-shirts, postcards of Kinshasa and the Congo River.',true),

  ('Rawbank Bureau de Change','rawbank-bureau-change','exchange','both','both',
   'Bureau de change officiel Rawbank. Conversion USD, EUR, GBP, CDF. Taux compétitifs affichés en temps réel. Ouvert 24h/24, 7j/7. Également services Western Union.',
   'Official Rawbank currency exchange. USD, EUR, GBP, CDF conversion. Competitive real-time rates. Open 24/7. Also Western Union services.',true),

  ('Equity BCDC ATM & Change','equity-bcdc','bank','international','arrivals',
   'Distributeur automatique Equity BCDC (USD et CDF) et bureau de change. Accepte Visa, Mastercard. Idéal à l''arrivée pour les voyageurs internationaux.',
   'Equity BCDC ATM (USD and CDF) and currency exchange. Accepts Visa, Mastercard. Ideal upon arrival for international travelers.',true),

  ('TMB — Trust Merchant Bank','tmb-bank','bank','both','both',
   'Espace bancaire TMB : retrait, versement, transferts internationaux (SWIFT), Mobile Money (Mpesa Vodacom). Conseiller bancaire disponible.',
   'TMB banking space: withdrawals, deposits, international transfers (SWIFT), Mobile Money (Mpesa Vodacom). Banking advisor available.',true),

  ('Vodacom Shop','vodacom-shop','telecom','international','arrivals',
   'Boutique officielle Vodacom Congo. Achetez une carte SIM prépayée à l''arrivée, rechargez votre compte, activez l''internet mobile 4G. Assistance en français et lingala.',
   'Official Vodacom Congo store. Buy a prepaid SIM card on arrival, top up your account, activate 4G mobile internet. Assistance in French and Lingala.',true),

  ('Airtel Store','airtel-store','telecom','both','arrivals',
   'Boutique Airtel Congo. SIM cards, recharges, packages data et voix, Airtel Money. Personnel bilingue français-anglais.',
   'Airtel Congo store. SIM cards, top-ups, data and voice packages, Airtel Money. Bilingual French-English staff.',true),

  ('Orange Congo','orange-congo','telecom','international','arrivals',
   'Point de service Orange Congo. Cartes SIM, offres data, Orange Money. Idéal pour les voyageurs d''affaires nécessitant une connectivité immédiate.',
   'Orange Congo service point. SIM cards, data offers, Orange Money. Ideal for business travelers requiring immediate connectivity.',true),

  ('Pharmacie de l''Aéroport','pharmacie-aeroport','pharmacy','international','both',
   'Pharmacie ouverte 24h/24. Médicaments de base, antipaludéens, vaccins (fièvre jaune sur rendez-vous), articles de voyage, tests de dépistage rapide.',
   'Pharmacy open 24/7. Basic medications, antimalarials, vaccines (yellow fever by appointment), travel items, rapid diagnostic tests.',true),

  ('Centre Médical FIH','centre-medical-fih','medical','international','arrivals',
   'Centre médical aéroportuaire. Contrôle du carnet de vaccination (fièvre jaune obligatoire), premiers soins, tests COVID, médecin disponible 24h/24.',
   'Airport medical center. Vaccination booklet check (yellow fever mandatory), first aid, COVID tests, doctor available 24/7.',true),

  ('Bar L''Escale','bar-escale','bar','international','after_security',
   'Bar animé proposant cocktails, vins, bières (Primus, Turbo King, Skol — marques congolaises), boissons sans alcool et tapas. Musique congolaise en sourdine.',
   'Lively bar offering cocktails, wines, beers (Primus, Turbo King, Skol — Congolese brands), soft drinks and tapas. Congolese music in the background.',true),

  ('Pressing FIH','pressing-fih','other','international','after_security',
   'Service de repassage express et retouches. Idéal pour les voyageurs d''affaires. Délai : 30 minutes. Paiement USD ou Mobile Money.',
   'Express ironing and alterations service. Ideal for business travelers. Turnaround: 30 minutes. Payment in USD or Mobile Money.',true),

  ('Librairie FIH','librairie-fih','boutique','both','both',
   'Librairie proposant ouvrages en français et anglais sur la RDC et l''Afrique, littérature congolaise (Sony Labou Tansi, V.Y. Mudimbe), presse internationale.',
   'Bookshop with French and English books on DRC and Africa, Congolese literature (Sony Labou Tansi, V.Y. Mudimbe), international press.',true),

  ('Salon de Beauté Mbote','salon-beaute-mbote','other','international','after_security',
   'Salon de coiffure et beauté. Coupe, tresses africaines, soins. Personnel spécialisé en cheveux africains et européens. Ouvert jusqu''au dernier vol.',
   'Hairdressing and beauty salon. Haircut, African braiding, treatments. Staff specialized in African and European hair. Open until the last flight.',true)
on conflict (slug) do nothing;

-- ============================================================
-- NEWS ARTICLES (5 articles réalistes)
-- ============================================================
insert into public.news_articles
  (slug, title_fr, title_en, excerpt_fr, excerpt_en, body_fr, body_en,
   category, author, published_at, status, tags)
values
  ('modernisation-terminal-international-fih-2025',
   'Lancement du projet de modernisation du Terminal International de N''djili',
   'Launch of N''djili International Terminal Modernization Project',
   'La Régie des Voies Aériennes annonce un investissement majeur pour la réhabilitation du terminal international de l''Aéroport de N''djili, visant à améliorer l''expérience des passagers et à répondre aux normes OACI.',
   'The Régie des Voies Aériennes announces a major investment for the rehabilitation of N''djili Airport''s international terminal, aiming to improve passenger experience and meet ICAO standards.',
   '<p>La Régie des Voies Aériennes (RVA) a officiellement lancé le projet de modernisation du Terminal International de l''Aéroport International de N''djili (FIH), lors d''une cérémonie présidée par le Directeur Général de la RVA.</p><p>Ce projet ambitieux, d''un investissement estimé à 120 millions USD, prévoit la rénovation complète du hall des départs, l''extension des salles d''embarquement, la mise aux normes des systèmes de sécurité conformément aux exigences de l''OACI (Organisation de l''Aviation Civile Internationale) et la création de nouvelles concessions commerciales.</p><p>Les travaux seront réalisés en deux phases pour maintenir les opérations aéroportuaires sans interruption. La première phase débutera en 2026 et concernera la rénovation du hall des arrivées et la mise à niveau des infrastructures techniques.</p>',
   '<p>The Régie des Voies Aériennes (RVA) has officially launched the modernization project of N''djili International Airport''s (FIH) International Terminal, during a ceremony presided over by the RVA Director General.</p><p>This ambitious project, with an estimated investment of USD 120 million, plans a complete renovation of the departure hall, extension of boarding rooms, upgrading of security systems in accordance with ICAO requirements, and the creation of new commercial concessions.</p>',
   'corporate','Direction de la Communication — RVA',
   '2026-03-15 09:00:00+00',
   'published',
   array['modernisation','terminal','OACI','investissement','RVA']),

  ('congo-airways-nouvelles-routes-2026',
   'Congo Airways ouvre de nouvelles routes vers Douala et Abidjan',
   'Congo Airways Opens New Routes to Douala and Abidjan',
   'La compagnie nationale congolaise Congo Airways élargit son réseau régional avec deux nouvelles liaisons hebdomadaires depuis Kinshasa vers Douala (Cameroun) et Abidjan (Côte d''Ivoire), à partir de mai 2026.',
   'Congolese national carrier Congo Airways expands its regional network with two new weekly connections from Kinshasa to Douala (Cameroon) and Abidjan (Côte d''Ivoire), starting May 2026.',
   '<p>Congo Airways (C0) a annoncé l''ouverture de deux nouvelles routes régionales depuis l''Aéroport International de N''djili (FIH) à compter du 15 mai 2026.</p><p>La liaison Kinshasa–Douala sera opérée deux fois par semaine (mardi et vendredi) avec un Bombardier Q400. La liaison Kinshasa–Abidjan, également bi-hebdomadaire (lundi et jeudi), sera assurée par un Boeing 737-700.</p><p>Ces nouvelles routes s''inscrivent dans la stratégie de Congo Airways de renforcer la connectivité de la RDC avec les grandes métropoles d''Afrique centrale et d''Afrique de l''Ouest francophone.</p>',
   '<p>Congo Airways (C0) has announced the opening of two new regional routes from N''djili International Airport (FIH) starting May 15, 2026.</p>',
   'operations','Direction Commerciale — Congo Airways',
   '2026-04-20 10:30:00+00',
   'published',
   array['Congo Airways','nouvelles routes','Douala','Abidjan','réseau']),

  ('initiative-reboisement-commune-nsele-fih',
   'FIH et la commune de Nsele unissent leurs forces pour un programme de reboisement',
   'FIH and Nsele Community Join Forces for a Reforestation Program',
   'Dans le cadre de sa politique environnementale, la RVA a signé un partenariat avec la Mairie de Nsele pour le reboisement de 50 hectares en bordure de la zone aéroportuaire, contribuant à la préservation du Pool Malebo.',
   'As part of its environmental policy, RVA has signed a partnership with the Nsele Municipality for the reforestation of 50 hectares on the edge of the airport zone, contributing to the preservation of Pool Malebo.',
   '<p>La Régie des Voies Aériennes (RVA) et la Mairie de la Commune de Nsele ont signé une convention de partenariat environnemental portant sur le reboisement de 50 hectares de terrain en bordure de la zone de protection aéroportuaire.</p><p>Ce programme, baptisé "Nsele Verte", prévoit la plantation de 30 000 arbres endémiques de la région du Pool Malebo sur une période de 3 ans, avec l''implication directe des communautés locales de Nsele, Masina et Kimbanseke.</p><p>En plus de contribuer à la préservation de la biodiversité du Pool Malebo, ce programme créera 120 emplois locaux pour l''entretien et le suivi des plantations.</p>',
   '<p>The Régie des Voies Aériennes (RVA) and the Nsele Municipal Authority have signed an environmental partnership agreement for the reforestation of 50 hectares on the edge of the airport protection zone.</p>',
   'community','Direction Environnement et Développement Durable — RVA',
   '2026-02-10 08:00:00+00',
   'published',
   array['environnement','reboisement','Nsele','Pool Malebo','communauté']),

  ('certification-iosa-rva-2026',
   'La RVA obtient la certification IOSA de l''IATA, une étape majeure pour l''aviation congolaise',
   'RVA Obtains IATA IOSA Certification: A Major Milestone for Congolese Aviation',
   'La Régie des Voies Aériennes annonce avec fierté avoir obtenu la certification IOSA (IATA Operational Safety Audit), attestant du respect des normes internationales de sécurité aérienne à l''Aéroport International de N''djili.',
   'The Régie des Voies Aériennes proudly announces obtaining the IOSA (IATA Operational Safety Audit) certification, attesting to compliance with international aviation safety standards at N''djili International Airport.',
   '<p>La Régie des Voies Aériennes (RVA) a obtenu la certification IOSA (IATA Operational Safety Audit) après un audit approfondi conduit par des inspecteurs indépendants mandatés par l''Association Internationale du Transport Aérien (IATA).</p><p>Cette certification, reconnue mondialement, atteste que l''Aéroport International de N''djili respecte les standards internationaux les plus élevés en matière de sécurité opérationnelle aérienne.</p><p>Cette étape est un signal fort pour les compagnies aériennes internationales souhaitant étendre leur réseau vers Kinshasa et contribue à renforcer la position de FIH comme hub aérien régional en Afrique centrale.</p>',
   '<p>The Régie des Voies Aériennes (RVA) has obtained IOSA (IATA Operational Safety Audit) certification after an in-depth audit conducted by independent inspectors mandated by the International Air Transport Association (IATA).</p>',
   'safety','Direction de la Sûreté et de la Sécurité — RVA',
   '2026-01-28 14:00:00+00',
   'published',
   array['IOSA','IATA','sécurité','certification','international']),

  ('programme-fih-art-exposition-artistes-congolais',
   'Programme FIH Art : les œuvres de Chéri Samba et de jeunes artistes kinois illuminent l''aéroport',
   'FIH Art Program: Works by Chéri Samba and Young Kinshasa Artists Light Up the Airport',
   'La RVA lance le Programme FIH Art, une initiative culturelle permanente qui transforme les galeries du terminal international en espace d''exposition pour les artistes congolais, mettant en lumière la richesse de la création contemporaine kinoise.',
   'RVA launches the FIH Art Program, a permanent cultural initiative that transforms the international terminal galleries into exhibition spaces for Congolese artists, highlighting the richness of Kinshasa''s contemporary creation.',
   '<p>L''Aéroport International de N''djili inaugure le Programme FIH Art, une initiative culturelle permanente qui fait de ses espaces publics une galerie d''art vivante dédiée à la création congolaise contemporaine.</p><p>Vingt-deux œuvres du maître Chéri Samba — peintre congolais de renommée internationale exposé au MoMA de New York — ornent désormais les galeries du terminal international. Ces œuvres aux couleurs vives et aux messages porteurs d''optimisme accueillent les voyageurs du monde entier avec l''énergie de Kinshasa.</p><p>Parallèlement, dix jeunes artistes kinois sélectionnés via un appel à candidatures exposent leurs créations en rotation trimestrielle, offrant une vitrine internationale à la nouvelle génération de la création congolaise.</p>',
   '<p>N''djili International Airport inaugurates the FIH Art Program, a permanent cultural initiative that makes its public spaces a living art gallery dedicated to contemporary Congolese creation.</p>',
   'community','Direction Culturelle — RVA',
   '2025-12-01 09:00:00+00',
   'published',
   array['FIH Art','Chéri Samba','culture','artistes','Kinshasa'])
on conflict (slug) do nothing;

-- ============================================================
-- JOB POSTINGS (5 offres d'emploi réalistes)
-- ============================================================
insert into public.job_postings
  (title, department, location, contract_type, experience_level,
   description_fr, requirements_fr, active, posted_at)
values
  ('Contrôleur de la Navigation Aérienne (CNA)',
   'Navigation Aérienne','FIH — Tour de Contrôle, Kinshasa','CDI','senior',
   'La RVA recrute un Contrôleur de la Navigation Aérienne expérimenté pour renforcer son équipe de la tour de contrôle de l''Aéroport International de N''djili. Sous la supervision du Chef de la Navigation Aérienne, vous assurerez le guidage sécurisé des aéronefs dans l''espace aérien de Kinshasa.',
   '• Licence CNA valide délivrée par l''Autorité de l''Aviation Civile de la RDC ou équivalent OACI\n• Minimum 5 ans d''expérience en contrôle de la navigation aérienne\n• Maîtrise des systèmes radar et procédures OACI\n• Anglais aéronautique niveau 4 OACI minimum\n• Capacité à travailler en équipes tournantes (24h/24)',
   true,'2026-04-01 00:00:00+00'),

  ('Responsable Sécurité Aéroportuaire',
   'Sûreté et Sécurité','FIH — Kinshasa','CDI','manager',
   'Sous la direction du Directeur de la Sûreté, vous coordonnerez l''ensemble des opérations de sécurité aéroportuaire : contrôle d''accès, fouille des passagers et bagages, supervision des équipes de sûreté et liaison avec les forces de l''ordre.',
   '• Diplôme universitaire en sécurité, criminologie ou domaine connexe\n• Minimum 7 ans d''expérience en sécurité aéroportuaire\n• Connaissance des normes OACI Annexe 17 et réglementations DGAC\n• Certifications sûreté aéroportuaire IATA/ICAO appréciées\n• Excellentes aptitudes en gestion d''équipe',
   true,'2026-03-15 00:00:00+00'),

  ('Technicien de Maintenance Aéronautique',
   'Maintenance et Ingénierie','FIH — Kinshasa','CDI','mid',
   'En tant que technicien de maintenance, vous assurerez la maintenance préventive et corrective des équipements aéroportuaires : véhicules de piste, passerelles télescopiques, systèmes de balisage et équipements de navigation au sol.',
   '• Brevet de Technicien Supérieur (BTS) en maintenance industrielle, électrotechnique ou mécanique\n• Minimum 3 ans d''expérience en maintenance d''équipements aéroportuaires ou industriels lourds\n• Connaissance des normes de sécurité OACI pour équipements de piste\n• Habilitations électriques BT/HT\n• Disponibilité pour astreintes et horaires décalés',
   true,'2026-04-10 00:00:00+00'),

  ('Agent de Service Client — Terminal International',
   'Services aux Passagers','FIH — Terminal International','CDD','junior',
   'En première ligne de l''accueil des passagers à l''Aéroport International de N''djili, vous représentez l''image de la RVA et de la RDC. Vous orientez, informez et assistez les passagers dans leur parcours aéroportuaire avec professionnalisme et bienveillance.',
   '• Diplôme d''État ou équivalent (Baccalauréat)\n• Excellentes aptitudes relationnelles et sens du service\n• Maîtrise du français, bon niveau d''anglais (une troisième langue est un atout)\n• Connaissance du Lingala appréciée\n• Première expérience en accueil ou tourisme appréciée\n• Disponibilité pour horaires décalés (travail en 3x8)',
   true,'2026-05-01 00:00:00+00'),

  ('Stagiaire — Direction Informatique et Systèmes',
   'Direction des Systèmes d''Information','FIH — Kinshasa','stage','junior',
   'La Direction des Systèmes d''Information de la RVA accueille un(e) stagiaire pour participer au déploiement et à la maintenance du nouveau portail web aéroportuaire et des systèmes d''information passagers.',
   '• Étudiant(e) en Licence 3 ou Master en Informatique, Génie Logiciel ou Réseaux\n• Connaissances en développement web (HTML, CSS, JavaScript, React appréciée)\n• Intérêt pour les systèmes d''information aéroportuaires\n• Autonomie, curiosité et esprit d''équipe\n• Durée : 3 à 6 mois',
   true,'2026-04-25 00:00:00+00')
on conflict do nothing;

-- ============================================================
-- WAIT TIMES (temps d'attente initiaux)
-- ============================================================
insert into public.wait_times (checkpoint_type, terminal, estimated_minutes, status)
values
  ('security_intl',        'international', 15, 'normal'),
  ('security_dom',         'domestic',      10, 'light'),
  ('immigration_departure','international', 20, 'normal'),
  ('immigration_arrival',  'international', 25, 'moderate'),
  ('customs',              'international', 10, 'light'),
  ('vaccination_check',    'international', 5,  'light')
on conflict do nothing;

-- ============================================================
-- PAGES CMS (pages statiques essentielles)
-- ============================================================
insert into public.pages (slug, title_fr, title_en, meta_description_fr, meta_description_en, is_published)
values
  ('a-propos','À propos de la RVA et de l''Aéroport de N''djili','About RVA and N''djili Airport',
   'Découvrez la Régie des Voies Aériennes (RVA), gestionnaire de l''Aéroport International de N''djili (FIH), et son rôle dans le développement du transport aérien en RDC.',
   'Discover the Régie des Voies Aériennes (RVA), manager of N''djili International Airport (FIH), and its role in the development of air transport in the DRC.',
   true),
  ('historique','Histoire de l''Aéroport International de N''djili','History of N''djili International Airport',
   'De sa fondation en 1953 sous la Sabena à son exploitation moderne par la RVA, découvrez l''histoire riche de l''Aéroport International de N''djili (FIH).',
   'From its founding in 1953 under Sabena to its modern operation by RVA, discover the rich history of N''djili International Airport (FIH).',
   true),
  ('contact','Contactez-nous — Aéroport FIH','Contact Us — FIH Airport',
   'Coordonnées et formulaire de contact de l''Aéroport International de N''djili (FIH) et de la Régie des Voies Aériennes (RVA), Kinshasa, RDC.',
   'Contact information and form for N''djili International Airport (FIH) and the Régie des Voies Aériennes (RVA), Kinshasa, DRC.',
   true),
  ('faq','Questions fréquentes — Aéroport FIH','FAQ — FIH Airport',
   'Toutes les réponses à vos questions sur l''Aéroport International de N''djili : visa, fièvre jaune, bagages, taxis, stationnement, Mobile Money.',
   'All answers to your questions about N''djili International Airport: visa, yellow fever, luggage, taxis, parking, Mobile Money.',
   true),
  ('conditions-utilisation','Conditions d''utilisation','Terms of Use',
   'Conditions générales d''utilisation du portail web officiel de l''Aéroport International de N''djili (FIH) — Régie des Voies Aériennes, RDC.',
   'General terms of use for the official web portal of N''djili International Airport (FIH) — Régie des Voies Aériennes, DRC.',
   true),
  ('politique-confidentialite','Politique de confidentialité','Privacy Policy',
   'Politique de protection des données personnelles du portail FIH, conforme au Règlement Général sur la Protection des Données (RGPD).',
   'Personal data protection policy for the FIH portal, compliant with the General Data Protection Regulation (GDPR).',
   true)
on conflict (slug) do nothing;
