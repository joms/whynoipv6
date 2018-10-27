
-- ----------------------------
-- Table structure
-- ----------------------------
DROP TABLE IF EXISTS countries;
CREATE TABLE countries (
    id SERIAL NOT NULL PRIMARY KEY,
    country_name varchar(100) NOT NULL,
    country_code varchar(2) NOT NULL,
    sites integer,
    v6sites integer,
    percent numeric(4,1)
);

DROP TABLE IF EXISTS sites;
CREATE TABLE sites (
    id SERIAL NOT NULL PRIMARY KEY,
    rank integer NOT NULL,
    hostname text NOT NULL,
    ipv6 boolean DEFAULT false,
    ns_ipv6 boolean DEFAULT false,
    checked boolean DEFAULT false,
    asn integer,
    country character varying(2),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    ipv6_created_at timestamp with time zone
);

DROP TABLE IF EXISTS stats;
CREATE TABLE stats (
    id SERIAL NOT NULL PRIMARY KEY,
    date date DEFAULT CURRENT_DATE NOT NULL,
    sites integer NOT NULL,
    ipv6 integer NOT NULL,
    ns integer NOT NULL,
    topv6 integer NOT NULL,
    topns integer NOT NULL,
    percent numeric(4,1) NOT NULL
);

-- ----------------------------
-- Indexes
-- ----------------------------

CREATE INDEX count_country ON sites USING btree (checked, country);
CREATE INDEX count_country_nsv6 ON sites USING btree (checked, ns_ipv6, country);
CREATE INDEX count_country_v6 ON sites USING btree (checked, ipv6, country);
CREATE INDEX count_nsv6 ON sites USING btree (checked, ns_ipv6);
CREATE INDEX count_v6 ON sites USING btree (checked, ipv6);
CREATE INDEX sites_country ON sites USING btree (country);
CREATE INDEX sites_rank ON sites USING btree (rank);
CREATE INDEX sites_v6_country_rank ON sites USING btree (ipv6, country, rank);

-- ----------------------------
-- Records of countries
-- ----------------------------
BEGIN;
INSERT INTO "countries" VALUES (1, 'Georgia', 'GE');
INSERT INTO "countries" VALUES (2, 'Afghanistan', 'AF');
INSERT INTO "countries" VALUES (3, 'Åland Islands', 'AX');
INSERT INTO "countries" VALUES (4, 'Albania', 'AL');
INSERT INTO "countries" VALUES (5, 'Algeria', 'DZ');
INSERT INTO "countries" VALUES (6, 'American Samoa', 'AS');
INSERT INTO "countries" VALUES (7, 'Andorra', 'AD');
INSERT INTO "countries" VALUES (8, 'Anguilla', 'AI');
INSERT INTO "countries" VALUES (9, 'Antarctica', 'AQ');
INSERT INTO "countries" VALUES (10, 'Antigua and Barbuda', 'AG');
INSERT INTO "countries" VALUES (11, 'Armenia', 'AM');
INSERT INTO "countries" VALUES (12, 'Aruba', 'AW');
INSERT INTO "countries" VALUES (13, 'Bahamas', 'BS');
INSERT INTO "countries" VALUES (14, 'Bahrain', 'BH');
INSERT INTO "countries" VALUES (15, 'Barbados', 'BB');
INSERT INTO "countries" VALUES (16, 'Benin', 'BJ');
INSERT INTO "countries" VALUES (17, 'Bermuda', 'BM');
INSERT INTO "countries" VALUES (18, 'Bhutan', 'BT');
INSERT INTO "countries" VALUES (19, 'Bolivia', 'BO');
INSERT INTO "countries" VALUES (20, 'Botswana', 'BW');
INSERT INTO "countries" VALUES (21, 'Bouvet Island', 'BV');
INSERT INTO "countries" VALUES (22, 'British Indian Ocean Territory', 'IO');
INSERT INTO "countries" VALUES (23, 'Brunei Darussalam', 'BN');
INSERT INTO "countries" VALUES (24, 'Burkina Faso', 'BF');
INSERT INTO "countries" VALUES (25, 'Burundi', 'BI');
INSERT INTO "countries" VALUES (26, 'Cambodia', 'KH');
INSERT INTO "countries" VALUES (27, 'Cameroon', 'CM');
INSERT INTO "countries" VALUES (28, 'Cape Verde', 'CV');
INSERT INTO "countries" VALUES (29, 'Central African Republic', 'CF');
INSERT INTO "countries" VALUES (30, 'Chad', 'TD');
INSERT INTO "countries" VALUES (31, 'Christmas Island', 'CX');
INSERT INTO "countries" VALUES (32, 'Cocos (Keeling) Islands', 'CC');
INSERT INTO "countries" VALUES (33, 'Comoros', 'KM');
INSERT INTO "countries" VALUES (34, 'Congo', 'CG');
INSERT INTO "countries" VALUES (35, 'Congo, The Democratic Republic Of The', 'CD');
INSERT INTO "countries" VALUES (36, 'Cook Islands', 'CK');
INSERT INTO "countries" VALUES (37, 'Costa Rica', 'CR');
INSERT INTO "countries" VALUES (38, 'Côte D''Ivoire', 'CI');
INSERT INTO "countries" VALUES (39, 'Cuba', 'CU');
INSERT INTO "countries" VALUES (40, 'Djibouti', 'DJ');
INSERT INTO "countries" VALUES (41, 'Dominica', 'DM');
INSERT INTO "countries" VALUES (42, 'Dominican Republic', 'DO');
INSERT INTO "countries" VALUES (43, 'El Salvador', 'SV');
INSERT INTO "countries" VALUES (44, 'Equatorial Guinea', 'GQ');
INSERT INTO "countries" VALUES (45, 'Eritrea', 'ER');
INSERT INTO "countries" VALUES (46, 'Ethiopia', 'ET');
INSERT INTO "countries" VALUES (47, 'Falkland Islands  (Malvinas)', 'FK');
INSERT INTO "countries" VALUES (48, 'Faroe Islands', 'FO');
INSERT INTO "countries" VALUES (49, 'Fiji', 'FJ');
INSERT INTO "countries" VALUES (50, 'French Guiana', 'GF');
INSERT INTO "countries" VALUES (51, 'French Polynesia', 'PF');
INSERT INTO "countries" VALUES (52, 'French Southern Territories', 'TF');
INSERT INTO "countries" VALUES (53, 'Gabon', 'GA');
INSERT INTO "countries" VALUES (54, 'Gambia', 'GM');
INSERT INTO "countries" VALUES (55, 'Ghana', 'GH');
INSERT INTO "countries" VALUES (56, 'Gibraltar', 'GI');
INSERT INTO "countries" VALUES (57, 'Greenland', 'GL');
INSERT INTO "countries" VALUES (58, 'Grenada', 'GD');
INSERT INTO "countries" VALUES (59, 'Guadeloupe', 'GP');
INSERT INTO "countries" VALUES (60, 'Guam', 'GU');
INSERT INTO "countries" VALUES (61, 'Guatemala', 'GT');
INSERT INTO "countries" VALUES (62, 'Guernsey', 'GG');
INSERT INTO "countries" VALUES (63, 'Guinea', 'GN');
INSERT INTO "countries" VALUES (64, 'Guinea-Bissau', 'GW');
INSERT INTO "countries" VALUES (65, 'Guyana', 'GY');
INSERT INTO "countries" VALUES (66, 'Haiti', 'HT');
INSERT INTO "countries" VALUES (67, 'Heard and McDonald Islands', 'HM');
INSERT INTO "countries" VALUES (68, 'Holy See (Vatican City State)', 'VA');
INSERT INTO "countries" VALUES (69, 'Honduras', 'HN');
INSERT INTO "countries" VALUES (70, 'Iceland', 'IS');
INSERT INTO "countries" VALUES (71, 'Iraq', 'IQ');
INSERT INTO "countries" VALUES (72, 'Isle of Man', 'IM');
INSERT INTO "countries" VALUES (73, 'Jamaica', 'JM');
INSERT INTO "countries" VALUES (74, 'Jersey', 'JE');
INSERT INTO "countries" VALUES (75, 'Jordan', 'JO');
INSERT INTO "countries" VALUES (76, 'Argentina', 'AR');
INSERT INTO "countries" VALUES (77, 'Austria', 'AT');
INSERT INTO "countries" VALUES (78, 'Australia', 'AU');
INSERT INTO "countries" VALUES (79, 'Azerbaijan', 'AZ');
INSERT INTO "countries" VALUES (80, 'Bosnia and Herzegovina', 'BA');
INSERT INTO "countries" VALUES (81, 'Bangladesh', 'BD');
INSERT INTO "countries" VALUES (82, 'Belgium', 'BE');
INSERT INTO "countries" VALUES (83, 'Bulgaria', 'BG');
INSERT INTO "countries" VALUES (84, 'Brazil', 'BR');
INSERT INTO "countries" VALUES (85, 'Belarus', 'BY');
INSERT INTO "countries" VALUES (86, 'Belize', 'BZ');
INSERT INTO "countries" VALUES (87, 'Canada', 'CA');
INSERT INTO "countries" VALUES (88, 'Chile', 'CL');
INSERT INTO "countries" VALUES (89, 'China', 'CN');
INSERT INTO "countries" VALUES (90, 'Colombia', 'CO');
INSERT INTO "countries" VALUES (91, 'Cyprus', 'CY');
INSERT INTO "countries" VALUES (92, 'Czech Republic', 'CZ');
INSERT INTO "countries" VALUES (93, 'Germany', 'DE');
INSERT INTO "countries" VALUES (94, 'Denmark', 'DK');
INSERT INTO "countries" VALUES (95, 'Ecuador', 'EC');
INSERT INTO "countries" VALUES (96, 'Estonia', 'EE');
INSERT INTO "countries" VALUES (97, 'Egypt', 'EG');
INSERT INTO "countries" VALUES (98, 'Finland', 'FI');
INSERT INTO "countries" VALUES (99, 'France', 'FR');
INSERT INTO "countries" VALUES (100, 'Greece', 'GR');
INSERT INTO "countries" VALUES (101, 'Hong Kong', 'HK');
INSERT INTO "countries" VALUES (102, 'Croatia', 'HR');
INSERT INTO "countries" VALUES (103, 'Hungary', 'HU');
INSERT INTO "countries" VALUES (104, 'Indonesia', 'ID');
INSERT INTO "countries" VALUES (105, 'Ireland', 'IE');
INSERT INTO "countries" VALUES (106, 'Israel', 'IL');
INSERT INTO "countries" VALUES (107, 'India', 'IN');
INSERT INTO "countries" VALUES (108, 'Iran', 'IR');
INSERT INTO "countries" VALUES (109, 'Italy', 'IT');
INSERT INTO "countries" VALUES (110, 'Japan', 'JP');
INSERT INTO "countries" VALUES (111, 'Cayman Islands', 'KY');
INSERT INTO "countries" VALUES (112, 'Kazakhstan', 'KZ');
INSERT INTO "countries" VALUES (113, 'Kiribati', 'KI');
INSERT INTO "countries" VALUES (114, 'Korea', 'KP');
INSERT INTO "countries" VALUES (115, 'Kuwait', 'KW');
INSERT INTO "countries" VALUES (116, 'Kyrgyzstan', 'KG');
INSERT INTO "countries" VALUES (117, 'Lao People', 'LA');
INSERT INTO "countries" VALUES (118, 'Lebanon', 'LB');
INSERT INTO "countries" VALUES (119, 'Lesotho', 'LS');
INSERT INTO "countries" VALUES (120, 'Liberia', 'LR');
INSERT INTO "countries" VALUES (121, 'Libyan Arab Jamahiriya', 'LY');
INSERT INTO "countries" VALUES (122, 'Liechtenstein', 'LI');
INSERT INTO "countries" VALUES (123, 'Macao', 'MO');
INSERT INTO "countries" VALUES (124, 'Madagascar', 'MG');
INSERT INTO "countries" VALUES (125, 'Malawi', 'MW');
INSERT INTO "countries" VALUES (126, 'Maldives', 'MV');
INSERT INTO "countries" VALUES (127, 'Mali', 'ML');
INSERT INTO "countries" VALUES (128, 'Marshall Islands', 'MH');
INSERT INTO "countries" VALUES (129, 'Martinique', 'MQ');
INSERT INTO "countries" VALUES (130, 'Mauritania', 'MR');
INSERT INTO "countries" VALUES (131, 'Mauritius', 'MU');
INSERT INTO "countries" VALUES (132, 'Mayotte', 'YT');
INSERT INTO "countries" VALUES (133, 'Micronesia', 'FM');
INSERT INTO "countries" VALUES (134, 'Monaco', 'MC');
INSERT INTO "countries" VALUES (135, 'Mongolia', 'MN');
INSERT INTO "countries" VALUES (136, 'Montenegro', 'ME');
INSERT INTO "countries" VALUES (137, 'Montserrat', 'MS');
INSERT INTO "countries" VALUES (138, 'Morocco', 'MA');
INSERT INTO "countries" VALUES (139, 'Mozambique', 'MZ');
INSERT INTO "countries" VALUES (140, 'Myanmar', 'MM');
INSERT INTO "countries" VALUES (141, 'Namibia', 'NA');
INSERT INTO "countries" VALUES (142, 'Nauru', 'NR');
INSERT INTO "countries" VALUES (143, 'Netherlands Antilles', 'AN');
INSERT INTO "countries" VALUES (144, 'New Caledonia', 'NC');
INSERT INTO "countries" VALUES (145, 'Nicaragua', 'NI');
INSERT INTO "countries" VALUES (146, 'Niger', 'NE');
INSERT INTO "countries" VALUES (147, 'Nigeria', 'NG');
INSERT INTO "countries" VALUES (148, 'Niue', 'NU');
INSERT INTO "countries" VALUES (149, 'Norfolk Island', 'NF');
INSERT INTO "countries" VALUES (150, 'Northern Mariana Islands', 'MP');
INSERT INTO "countries" VALUES (151, 'Oman', 'OM');
INSERT INTO "countries" VALUES (152, 'Palau', 'PW');
INSERT INTO "countries" VALUES (153, 'Palestinian Territory', 'PS');
INSERT INTO "countries" VALUES (154, 'Papua New Guinea', 'PG');
INSERT INTO "countries" VALUES (155, 'Paraguay', 'PY');
INSERT INTO "countries" VALUES (156, 'Peru', 'PE');
INSERT INTO "countries" VALUES (157, 'Philippines', 'PH');
INSERT INTO "countries" VALUES (158, 'Saint Pierre And Miquelon', 'PM');
INSERT INTO "countries" VALUES (159, 'Pitcairn', 'PN');
INSERT INTO "countries" VALUES (160, 'Puerto Rico', 'PR');
INSERT INTO "countries" VALUES (161, 'Réunion', 'RE');
INSERT INTO "countries" VALUES (162, 'Rwanda', 'RW');
INSERT INTO "countries" VALUES (163, 'Saint Helena', 'SH');
INSERT INTO "countries" VALUES (164, 'Saint Kitts And Nevis', 'KN');
INSERT INTO "countries" VALUES (165, 'Saint Lucia', 'LC');
INSERT INTO "countries" VALUES (166, 'Saint Vincent And The Grenedines', 'VC');
INSERT INTO "countries" VALUES (167, 'Samoa', 'WS');
INSERT INTO "countries" VALUES (168, 'San Marino', 'SM');
INSERT INTO "countries" VALUES (169, 'Sao Tome and Principe', 'ST');
INSERT INTO "countries" VALUES (170, 'Senegal', 'SN');
INSERT INTO "countries" VALUES (171, 'Sierra Leone', 'SL');
INSERT INTO "countries" VALUES (172, 'Slovenia', 'SI');
INSERT INTO "countries" VALUES (173, 'Solomon Islands', 'SB');
INSERT INTO "countries" VALUES (174, 'Somalia', 'SO');
INSERT INTO "countries" VALUES (175, 'South Georgia', 'GS');
INSERT INTO "countries" VALUES (176, 'Sri Lanka', 'LK');
INSERT INTO "countries" VALUES (177, 'Sudan', 'SD');
INSERT INTO "countries" VALUES (178, 'Suriname', 'SR');
INSERT INTO "countries" VALUES (179, 'Svalbard And Jan Mayen', 'SJ');
INSERT INTO "countries" VALUES (180, 'Swaziland', 'SZ');
INSERT INTO "countries" VALUES (181, 'Syrian Arab Republic', 'SY');
INSERT INTO "countries" VALUES (182, 'Tajikistan', 'TJ');
INSERT INTO "countries" VALUES (183, 'Tanzania', 'TZ');
INSERT INTO "countries" VALUES (184, 'Timor-Leste', 'TL');
INSERT INTO "countries" VALUES (185, 'Togo', 'TG');
INSERT INTO "countries" VALUES (186, 'Tokelau', 'TK');
INSERT INTO "countries" VALUES (187, 'Tonga', 'TO');
INSERT INTO "countries" VALUES (188, 'Trinidad and Tobago', 'TT');
INSERT INTO "countries" VALUES (189, 'Spain', 'ES');
INSERT INTO "countries" VALUES (190, 'Kenya', 'KE');
INSERT INTO "countries" VALUES (191, 'Korea', 'KR');
INSERT INTO "countries" VALUES (192, 'Lithuania', 'LT');
INSERT INTO "countries" VALUES (193, 'Luxembourg', 'LU');
INSERT INTO "countries" VALUES (194, 'Latvia', 'LV');
INSERT INTO "countries" VALUES (195, 'Moldova', 'MD');
INSERT INTO "countries" VALUES (196, 'Macedonia', 'MK');
INSERT INTO "countries" VALUES (197, 'Malta', 'MT');
INSERT INTO "countries" VALUES (198, 'Mexico', 'MX');
INSERT INTO "countries" VALUES (199, 'Malaysia', 'MY');
INSERT INTO "countries" VALUES (200, 'Netherlands', 'NL');
INSERT INTO "countries" VALUES (201, 'Norway', 'NO');
INSERT INTO "countries" VALUES (202, 'Nepal', 'NP');
INSERT INTO "countries" VALUES (203, 'New Zealand', 'NZ');
INSERT INTO "countries" VALUES (204, 'Panama', 'PA');
INSERT INTO "countries" VALUES (205, 'Pakistan', 'PK');
INSERT INTO "countries" VALUES (206, 'Poland', 'PL');
INSERT INTO "countries" VALUES (207, 'Portugal', 'PT');
INSERT INTO "countries" VALUES (208, 'Qatar', 'QA');
INSERT INTO "countries" VALUES (209, 'Romania', 'RO');
INSERT INTO "countries" VALUES (210, 'Serbia', 'RS');
INSERT INTO "countries" VALUES (211, 'Russian Federation', 'RU');
INSERT INTO "countries" VALUES (212, 'Saudi Arabia', 'SA');
INSERT INTO "countries" VALUES (213, 'Seychelles', 'SC');
INSERT INTO "countries" VALUES (214, 'Sweden', 'SE');
INSERT INTO "countries" VALUES (215, 'Singapore', 'SG');
INSERT INTO "countries" VALUES (216, 'Slovakia', 'SK');
INSERT INTO "countries" VALUES (217, 'Thailand', 'TH');
INSERT INTO "countries" VALUES (218, 'Tunisia', 'TN');
INSERT INTO "countries" VALUES (219, 'Taiwan', 'TW');
INSERT INTO "countries" VALUES (220, 'South Africa', 'ZA');
INSERT INTO "countries" VALUES (221, 'Turkmenistan', 'TM');
INSERT INTO "countries" VALUES (222, 'Turks and Caicos Islands', 'TC');
INSERT INTO "countries" VALUES (223, 'Tuvalu', 'TV');
INSERT INTO "countries" VALUES (224, 'Uganda', 'UG');
INSERT INTO "countries" VALUES (225, 'United Arab Emirates', 'AE');
INSERT INTO "countries" VALUES (226, 'United States Minor Outlying Islands', 'UM');
INSERT INTO "countries" VALUES (227, 'Uruguay', 'UY');
INSERT INTO "countries" VALUES (228, 'Vanuatu', 'VU');
INSERT INTO "countries" VALUES (229, 'Virgin Islands', 'VI');
INSERT INTO "countries" VALUES (230, 'Wallis and Futuna', 'WF');
INSERT INTO "countries" VALUES (231, 'Western Sahara', 'EH');
INSERT INTO "countries" VALUES (232, 'Yemen', 'YE');
INSERT INTO "countries" VALUES (233, 'Zambia', 'ZM');
INSERT INTO "countries" VALUES (234, 'Zimbabwe', 'ZW');
INSERT INTO "countries" VALUES (235, 'Saint Barthélemy', 'BL');
INSERT INTO "countries" VALUES (236, 'Saint Martin', 'MF');
INSERT INTO "countries" VALUES (237, 'Bonaire', 'BQ');
INSERT INTO "countries" VALUES (238, 'Curaçao', 'CW');
INSERT INTO "countries" VALUES (239, 'Sint Maarten', 'SX');
INSERT INTO "countries" VALUES (240, 'South Sudan', 'SS');
INSERT INTO "countries" VALUES (241, 'Angola', 'AO');
INSERT INTO "countries" VALUES (242, 'Switzerland', 'CH');
INSERT INTO "countries" VALUES (243, 'United Kingdom', 'GB');
INSERT INTO "countries" VALUES (244, 'Turkey', 'TR');
INSERT INTO "countries" VALUES (245, 'Ukraine', 'UA');
INSERT INTO "countries" VALUES (246, 'United States', 'US');
INSERT INTO "countries" VALUES (247, 'Uzbekistan', 'UZ');
INSERT INTO "countries" VALUES (248, 'Venezuela', 'VE');
INSERT INTO "countries" VALUES (249, 'Virgin Islands', 'VG');
INSERT INTO "countries" VALUES (250, 'Viet Nam', 'VN');
COMMIT;
