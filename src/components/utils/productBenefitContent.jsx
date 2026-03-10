// Product Benefit Content Mapping
// Provides contextualized content for each product based on life stage + benefit

export const getProductContent = (productCode, lifeStage, benefit) => {
  const contentMap = {
    // FP-01 – Ginger
    "FP-01": {
      "Reproductive Age_Menstrual comfort": {
        headline: "Natural Menstrual Comfort",
        description: "Digestive and uterine comfort during your menstrual cycle, supporting your body's natural rhythms.",
        howItWorks: "Ginger supports digestive wellness and provides gentle comfort during menstruation, helping you feel more balanced throughout your cycle.",
        educationalContext: "Traditionally used for centuries to support menstrual well-being and digestive comfort in women."
      },
      "Pregnancy_Nausea & vomiting support": {
        headline: "Morning Sickness Support",
        description: "Gentle, pregnancy-safe digestive comfort to help ease nausea and support your well-being during early pregnancy.",
        howItWorks: "Ginger provides natural digestive support, helping to ease morning sickness and nausea with a gentle, reassuring approach.",
        educationalContext: "Widely recognized as a pregnancy-safe option for digestive comfort during the first trimester."
      },
      "Pregnancy_Morning sickness support": {
        headline: "Morning Sickness Support",
        description: "Gentle, pregnancy-safe digestive comfort to help ease nausea and support your well-being during early pregnancy.",
        howItWorks: "Ginger provides natural digestive support, helping to ease morning sickness and nausea with a gentle, reassuring approach.",
        educationalContext: "Widely recognized as a pregnancy-safe option for digestive comfort during the first trimester."
      },
      "Post-Pregnancy / Lactation_Lactation support": {
        headline: "Digestive Comfort for New Mothers",
        description: "Traditional support for lactation and digestive wellness during your post-pregnancy journey.",
        howItWorks: "Ginger supports digestive comfort and has been traditionally used to support lactation in new mothers.",
        educationalContext: "Traditionally used to support breastfeeding mothers with gentle digestive and lactation support."
      },
      "Menopause_Comfort support during menopause": {
        headline: "Digestive Comfort During Menopause",
        description: "Overall digestive and comfort support as you navigate menopausal transitions.",
        howItWorks: "Ginger provides gentle digestive wellness and general comfort support during menopause.",
        educationalContext: "A supportive botanical for digestive wellness and overall comfort during life transitions."
      }
    },

    // FP-02 – Cinnamon
    "FP-02": {
      "Reproductive Age_Supports healthy insulin levels": {
        headline: "Metabolic & Insulin Balance",
        description: "Support for healthy glucose metabolism and insulin balance in women of reproductive age.",
        howItWorks: "Cinnamon supports healthy glucose and insulin balance, helping maintain metabolic wellness.",
        educationalContext: "Studied for its role in supporting healthy blood sugar metabolism and metabolic function."
      },
      "Reproductive Age_Menstrual comfort": {
        headline: "Menstrual & Metabolic Comfort",
        description: "Supportive role in menstrual comfort through metabolic and inflammatory balance.",
        howItWorks: "Cinnamon supports metabolic wellness and provides comfort during the menstrual cycle.",
        educationalContext: "Traditionally used to support menstrual comfort and metabolic balance."
      },
      "Menopause_Emotional balance & overall well-being support": {
        headline: "Emotional & Metabolic Wellness",
        description: "General emotional and metabolic wellness support during early post-menopause transitions.",
        howItWorks: "Cinnamon supports overall well-being and metabolic balance as you navigate menopausal changes.",
        educationalContext: "A gentle botanical for supporting emotional balance and metabolic wellness."
      }
    },

    // FP-03 – Moringa Leaf
    "FP-03": {
      "Reproductive Age_Oxidative balance": {
        headline: "Antioxidant & Nutritional Support",
        description: "Antioxidant and nutritional support for active women, providing daily wellness benefits.",
        howItWorks: "Moringa provides rich nutritional support with powerful antioxidants for daily vitality.",
        educationalContext: "Known as a nutrient-dense superfood with broad antioxidant and wellness benefits."
      },
      "Post-Pregnancy / Lactation_Lactation support": {
        headline: "Nutrient-Dense Lactation Support",
        description: "Rich nutritional support for breastfeeding mothers, traditionally used to support lactation.",
        howItWorks: "Moringa's nutrient density supports lactation and provides essential nutrition during breastfeeding.",
        educationalContext: "Traditionally used to support nursing mothers with its rich nutritional profile."
      },
      "Menopause_Antioxidant wellness support": {
        headline: "Cellular & Antioxidant Wellness",
        description: "Cellular and antioxidant wellness during menopause, supporting general vitality.",
        howItWorks: "Moringa provides antioxidant support and nutritional wellness during menopausal transitions.",
        educationalContext: "A nutrient-rich botanical supporting cellular health and vitality."
      }
    },

    // FP-04 – Garlic
    "FP-04": {
      "Across Adult Stage_Antioxidant support": {
        headline: "Daily Antioxidant Wellness",
        description: "Daily antioxidant and digestive wellness for general adult female health.",
        howItWorks: "Garlic supports antioxidant defense and digestive wellness as part of daily health routines.",
        educationalContext: "A time-honored botanical for daily wellness and antioxidant support."
      },
      "Reproductive Age_Metabolic wellness": {
        headline: "Metabolic Balance Support",
        description: "Support for metabolic balance and overall wellness in reproductive years.",
        howItWorks: "Garlic supports healthy metabolic function and overall wellness.",
        educationalContext: "Studied for its supportive role in metabolic health and wellness."
      },
      "Post-Menopause_Cardiovascular wellness support": {
        headline: "Heart & Circulatory Wellness",
        description: "Heart and circulatory support for wellness in later life stages.",
        howItWorks: "Garlic supports cardiovascular wellness and healthy circulation.",
        educationalContext: "Traditionally used to support heart health and circulatory wellness."
      }
    },

    // FP-05 – Shatavari
    "FP-05": {
      "Reproductive Age_Reproductive health support": {
        headline: "Reproductive & Hormonal Wellness",
        description: "Women's reproductive vitality and hormonal balance support.",
        howItWorks: "Shatavari supports reproductive wellness and hormonal balance in women of reproductive age.",
        educationalContext: "A revered Ayurvedic herb for women's reproductive health and vitality."
      },
      "Post-Pregnancy / Lactation_Lactation support": {
        headline: "Traditional Lactation Support",
        description: "Traditional and clinical lactation support for post-partum vitality.",
        howItWorks: "Shatavari has strong traditional use for supporting lactation and post-partum recovery.",
        educationalContext: "One of the most trusted herbs for supporting breastfeeding mothers in Ayurvedic tradition."
      },
      "Perimenopause_Menstrual discomfort relief": {
        headline: "Hormonal Transition Support",
        description: "Hormonal balance and menstrual comfort during perimenopause transitions.",
        howItWorks: "Shatavari supports hormonal balance and provides comfort during perimenopausal changes.",
        educationalContext: "Traditionally used to support women through hormonal transitions with comfort and balance."
      },
      "Post-Menopause_Muscle function & vitality support": {
        headline: "Strength & Vitality Maintenance",
        description: "Support for strength, vitality, and energy maintenance in later life.",
        howItWorks: "Shatavari supports muscle function, vitality, and overall energy as you age.",
        educationalContext: "A rejuvenating botanical for maintaining vitality and strength."
      },
      "Across Adult Stage_Energy & fatigue management": {
        headline: "Adaptogenic Vitality Support",
        description: "Adaptogenic and vitality support for general women's wellness and energy.",
        howItWorks: "Shatavari acts as an adaptogen, supporting energy levels and helping manage daily fatigue.",
        educationalContext: "Known as a rejuvenating adaptogen for women's vitality and energy."
      }
    },

    // FP-06 – Fenugreek
    "FP-06": {
      "Reproductive Age_Menstrual comfort": {
        headline: "Cycle-Related Comfort",
        description: "Digestive and metabolic support for menstrual cycle comfort.",
        howItWorks: "Fenugreek supports cycle-related comfort through digestive and metabolic wellness.",
        educationalContext: "Traditionally used to support menstrual comfort and digestive balance."
      },
      "Reproductive Age_Hormonal & metabolic wellness": {
        headline: "Hormonal & Metabolic Balance",
        description: "Support for hormonal balance and metabolic parameters in reproductive years.",
        howItWorks: "Fenugreek supports hormonal balance and healthy metabolic function.",
        educationalContext: "Studied for its supportive role in hormonal and metabolic wellness."
      },
      "Post-Pregnancy / Lactation_Lactation support": {
        headline: "Evidence-Based Lactation Support",
        description: "Strong clinical support for lactation in post-partum mothers.",
        howItWorks: "Fenugreek is one of the most studied herbs for supporting milk production in breastfeeding mothers.",
        educationalContext: "Extensively studied and traditionally used for lactation support."
      },
      "Menopause_Menopausal comfort": {
        headline: "Menopausal Comfort Support",
        description: "Educational comfort support during menopausal transitions.",
        howItWorks: "Fenugreek provides gentle comfort support during menopause.",
        educationalContext: "A supportive botanical for comfort during life transitions."
      }
    },

    // FP-07 – Fennel
    "FP-07": {
      "Reproductive Age_Menstrual comfort": {
        headline: "Digestive & Cycle Comfort",
        description: "Digestive comfort and menstrual cycle support.",
        howItWorks: "Fennel supports digestive wellness and provides comfort during menstruation.",
        educationalContext: "Traditionally used for digestive comfort and menstrual wellness."
      },
      "Post-Pregnancy / Lactation_Lactation support": {
        headline: "Clinical Lactation Support",
        description: "Clinical and traditional lactation support with gentle digestive benefits.",
        howItWorks: "Fennel has both traditional use and clinical backing for supporting lactation.",
        educationalContext: "A well-studied herb for supporting breastfeeding mothers."
      },
      "Post-Menopause_Hormonal balance support": {
        headline: "Gentle Hormonal Wellness",
        description: "Secondary hormonal wellness support in post-menopause.",
        howItWorks: "Fennel provides gentle support for hormonal balance.",
        educationalContext: "A supportive botanical for overall hormonal wellness."
      }
    },

    // FP-08 – Giloy
    "FP-08": {
      "Perimenopause_Comfort during hormonal changes": {
        headline: "Immune & Stress Resilience",
        description: "Immune and stress resilience during mid-life hormonal transitions.",
        howItWorks: "Giloy supports immune function and stress balance during perimenopausal changes.",
        educationalContext: "Traditionally used to support immunity and resilience during life transitions."
      },
      "Across Adult Stage_Immune resilience support": {
        headline: "Daily Immune Wellness",
        description: "Daily immune and overall wellness support.",
        howItWorks: "Giloy supports immune resilience and overall vitality.",
        educationalContext: "A revered Ayurvedic herb for immune support and daily wellness."
      }
    },

    // FP-09 – Licorice
    "FP-09": {
      "Reproductive Age_Metabolic wellness support": {
        headline: "Digestive & Metabolic Support",
        description: "Digestive and metabolic support aligned with active lifestyles.",
        howItWorks: "Licorice supports digestive wellness and metabolic balance.",
        educationalContext: "Traditionally used for digestive comfort and metabolic support."
      },
      "Post-Menopause_General women's wellness": {
        headline: "Supportive Wellness",
        description: "Supportive, non-primary wellness for overall health.",
        howItWorks: "Licorice provides gentle wellness support for overall health.",
        educationalContext: "A traditional botanical for general wellness support."
      }
    },

    // FP-10 – Ashwagandha
    "FP-10": {
      "Reproductive Age_Reproductive wellness support": {
        headline: "Stress Resilience & Reproductive Wellness",
        description: "Stress resilience supporting reproductive wellness in reproductive years.",
        howItWorks: "Ashwagandha supports stress balance and reproductive wellness through adaptogenic properties.",
        educationalContext: "A powerful adaptogen traditionally used to support women's reproductive health."
      },
      "Across Adult Stage_Emotional balance & healthy sleep": {
        headline: "Daily Stress & Sleep Support",
        description: "Daily stress, mood, and sleep support for general adult female wellness.",
        howItWorks: "Ashwagandha helps manage daily stress, supports emotional balance, and promotes healthy sleep.",
        educationalContext: "One of the most studied adaptogens for stress, mood, and sleep quality."
      },
      "Post-Menopause_Stress balance during hormonal transitions": {
        headline: "Stress Management Support",
        description: "Stress management during hormonal transitions in post-menopause.",
        howItWorks: "Ashwagandha supports stress balance as your body navigates hormonal changes.",
        educationalContext: "An adaptogen supporting resilience during life transitions."
      }
    },

    // FP-11 – Amla
    "FP-11": {
      "Across Adult Stage_General vitality": {
        headline: "Antioxidant & Immune Vitality",
        description: "Antioxidant, immune, and metabolic wellness with skin radiance support for daily vitality.",
        howItWorks: "Amla provides powerful antioxidant support, immune wellness, and promotes skin radiance.",
        educationalContext: "A revered superfruit in Ayurveda for overall vitality and wellness."
      },
      "Across Adult Stage_Immune wellness": {
        headline: "Immune & Antioxidant Support",
        description: "Immune wellness and antioxidant protection for daily health.",
        howItWorks: "Amla supports immune function with rich vitamin C and antioxidant content.",
        educationalContext: "Known as one of nature's richest sources of vitamin C and antioxidants."
      },
      "Across Adult Stage_Skin radiance": {
        headline: "Skin Radiance & Vitality",
        description: "Skin radiance support through antioxidant and metabolic wellness.",
        howItWorks: "Amla supports skin health from within with powerful antioxidants and nutrients.",
        educationalContext: "Traditionally used for promoting radiant skin and overall beauty."
      }
    }
  };

  // Create lookup key
  const key = `${lifeStage}_${benefit}`;
  const productContent = contentMap[productCode];
  
  if (productContent && productContent[key]) {
    return productContent[key];
  }

  // Fallback to default content if specific combination not found
  return {
    headline: "Wellness Support",
    description: "Supporting your wellness journey with quality ingredients.",
    howItWorks: "This supplement supports your overall health and well-being.",
    educationalContext: "A trusted botanical for wellness support."
  };
};