import Hero from "../models/Hero.js";

// @desc Get hero section
// @route GET /api/hero
export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create hero section
// @route POST /api/hero
export const createHero = async (req, res) => {
  try {
    const { title, subtitle, image } = req.body;

    // ჯერ ვნახოთ, hero არსებობს თუ არა
    let hero = await Hero.findOne();

    if (hero) {
      // hero უკვე არსებობს → განახლება
      hero.title = title || hero.title;
      hero.subtitle = subtitle || hero.subtitle;
      hero.image = image || hero.image;

      const updatedHero = await hero.save();
      return res.json(updatedHero);
    }

    // hero არ არსებობს → შევქმნათ ახალი
    hero = new Hero({ title, subtitle, image });
    const savedHero = await hero.save();

    res.status(201).json(savedHero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Update hero section
// @route PUT /api/hero/:id
export const updateHero = async (req, res) => {
  try {
    const { title, subtitle, image } = req.body;

    const hero = await Hero.findOne(); // ყოველთვის ერთი hero
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    hero.title = title || hero.title;
    hero.subtitle = subtitle || hero.subtitle;
    hero.image = image || hero.image;

    const updatedHero = await hero.save();
    res.json(updatedHero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

