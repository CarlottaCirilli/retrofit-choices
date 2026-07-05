Degrees of Freedom - Interactive site (Architect + User)

WHAT IS NEW
-----------
This version includes:
1. Architect band with 9 combined elevation states
2. User band with 2 independent sliders and 6 total images

USER LOGIC
----------
The User band has one image on top and 2 sliders below.
The sliders are NOT combined.
This means:
- 3 images for curtain position
- 3 images for light temperature
- 6 images total

The image updates based on the most recently adjusted slider.
So if you touch Curtain, it shows the curtain image.
If you touch Light, it shows the light image.

IMAGE NAMES
-----------
Architect band:
- elevation_t-1_c1.png
- elevation_t-1_c2.png
- elevation_t-1_c3.png
- elevation_t0_c1.png
- elevation_t0_c2.png
- elevation_t0_c3.png
- elevation_t1_c1.png
- elevation_t1_c2.png
- elevation_t1_c3.png

User band:
Curtains:
- user_curtain_1.png  (high curtain)
- user_curtain_2.png  (medium curtain)
- user_curtain_3.png  (low curtain)

Light:
- user_light_1.png    (warm light)
- user_light_2.png    (medium light)
- user_light_3.png    (cold light)

WHERE TO CHANGE THE CODE
------------------------
Open script.js.
You will find two commented sections:
- HOW TO REPLACE THE 9 ARCHITECT PLACEHOLDERS WITH REAL IMAGES
- HOW TO REPLACE THE 6 USER PLACEHOLDERS WITH REAL IMAGES

Those comments show exactly which line to replace.


USER KPI OUTPUT
---------------
The User band now shows numerical information under the image.

Curtain slider:
- High curtain: 6.4% glare risk area, 21.2% underlit area
- Medium curtain: 0% glare risk area, 21.2% underlit area
- Low curtain: 0% glare risk area, 24.3% underlit area

Light slider:
- Warm light: 0.04 kWh/h
- Medium light: 0.04 kWh/h
- Cold light: 0.04 kWh/h

The light output only shows hourly energy, as requested.


LATEST KPI UPDATE
-----------------
Curtain KPI output now shows only:
- Glare risk area
- Underlit area

Light KPI output now shows:
- Light temperature in Kelvin
- Hourly energy

Light temperatures:
- Warm light: 3000 K
- Medium light: 4000 K
- Cold light: 6500 K


BUILDING MANAGER BAND
---------------------
The third band compares three investment scenarios:
- Scenario A: glazing replacement now
- Scenario B: glazing replacement in 2050
- Scenario C: glazing replacement in 2080

The bar chart shows:
- Investment / maintenance in €/m²
- Bill saving in €/m²
- Final LCC in €/m²

The "Open intervention plan" button opens a modal window with the list of actions by year.


ARCHITECT CURVE MAPPER INTEGRATION
----------------------------------
Added as the last block of the Architect section:
- stepped horizontal band mapper
- 30 x-steps
- 20 y-steps
- fixed 4-floor logic
- horizontal void size slider
- two draggable control points


TITLE HIERARCHY SYNC
--------------------
The current files use the same title hierarchy and UI text as the provided reference index.html.
A helper file named title_hierarchy_reference.txt has been added to list all extracted text levels.


TEXT STRINGS SYNC FROM REFERENCE
--------------------------------
Only titles, subtitles and body copy were aligned to the supplied reference HTML.
No layout, CSS structure or interaction logic was intentionally changed.


FIXED IMAGE-FRAME SIZING
------------------------
The image frames are now kept at a fixed visual height so they do not become larger than the slider card.
On mobile, the frame height remains locked instead of expanding vertically.


MANAGER LEGEND AND MOBILE IMAGE FIX
-----------------------------------
- The manager chart legend was moved near the LCC card, outside the bar chart area.
- Bar values are now positioned directly above their own bars.
- On mobile, inserted image frames shrink to the displayed image size instead of keeping a large empty box.


MOBILE TEXT SLIDER FIX
----------------------
Only on phone/tablet widths, image captions, slider descriptions, tick labels and KPI cards were reduced so the image remains visible while adjusting sliders.


MOBILE KPI SIDE BY SIDE
-----------------------
On phone widths, the two KPI cards remain side by side instead of stacking vertically.


MOBILE USER GAP REDUCED
-----------------------
Only on mobile widths, the vertical space between the user image/KPI card and the slider card was reduced.


MOBILE LCC CHART COMPACT
------------------------
Only on mobile widths, the LCC value was reduced to the same visual scale as the KPI percentages and the bar chart was compacted to keep all four years on one row.


MOBILE MANAGER GAP AND BAR VALUES FIX
-------------------------------------
Only on mobile widths, the gap between Scenario title and LCC card was reduced, and bar values were realigned above their own scaled mobile columns.


MOBILE BAR LABELS FIXED
-----------------------
Only on mobile widths, bar values are forced above their respective bars and the chart height/padding is reduced to remove unnecessary empty space.


MOBILE MANAGER COMPACT ALIGNED
------------------------------
Only on mobile widths, the manager header gaps were reduced and the four chart years were forced onto one aligned row.


LCC SAME AS KPI
---------------
The Final LCC label and value now use the same typographic scale as the KPI percentage cards in the second band, both on desktop and mobile.


SECONDARY IMAGE CAPTIONS REMOVED
--------------------------------
The secondary caption lines under the Architect and User images were removed.
Mobile spacing was tightened to avoid empty gaps after removal.
