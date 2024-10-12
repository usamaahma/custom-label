import React from "react";
import "./bestcustom.css";

function Wovendesign() {
  return (
    <div className="best-main">
      <div className="second-best-main">
        <div>
          <p className="best-heading">Woven Label Design Tips</p>
          <p className="best-p">
            Remember to include sewing margin. Visualize how you will be
            applying the label and leave at least 1⁄8” space between your design
            elements and the edge of the label to accommodate your stitch line.
            If sewing into a seam, remember to include se am allowance. Meaning,
            we recommend adding 1⁄4” of woven label material as the portion of
            your label that will be inserted into a seam before sewing.
            Similarly, when designing end fold, manhattan fold or book cover
            fold labels please add 1⁄4” of material for the portions of the
            label that will be folded back.
          </p>
          <img
            className="best-image"
            alt="best-main"
            src="../images/roos.webp"
          />
        </div>
        <div className="left-best">
          <p className="best-heading">How It Works</p>
          <img
            className="best-image"
            alt="best-main"
            src="../images/how.webp"
          />
          <p className="best-heading">
            Iron-on Woven Labels & Sticker Woven Lables
          </p>
          <p className="best-p">
            When sewing isn’t convenient, iron on woven labels or peel & stick
            woven labels are great options. Iron-on clothing labels allow you to
            permanently attach woven labels to clothing with a home iron. Each
            application only takes around 30 seconds! For heat press set to 375O
            F or for home iron set to medium cotton setting, no steam. Press
            firmly for 20 seconds, then place on a flat surface and let cool
            completely. Peel & stick backing turns your woven label into a
            convenient sticker. This option is a great way to quickly apply a
            label at special events. This option is also used by manufacturers
            to hold labels in place for sewing, particularly when sewing woven
            labels on baseball caps or similar products.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Wovendesign;
