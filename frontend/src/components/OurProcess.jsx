import React from 'react';

function OurProcess() {
  return (
    <section id="process" className="process-section">
      <div className="process-container">
        <div className="section-title">
          <h2>What Makes Our Products <span style={{ color: 'var(--white)' }}>Unique</span></h2>
          <p>OUR PROCESS</p>
        </div>
        <p className="process-intro">
          Free from any kind harmful chemicals, preservatives, additives and anything that is not natural. All our products are made using the age-old techniques which ensure that the nutritional integrity of the food is not compromised. Our processes are as pure as our heart!
        </p>

        <div className="process-timeline">
          <div className="process-step">
            <div className="step-media">
              <video src="/images/desi.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Ahinsak Hand Milking</h3>
              <p>We extract A2 milk from our Gir Cows using the ancient Indian practice of “dohan”. According to the Veda’s, “dohan” literally means letting the calf feed to its satisfaction from two “anchals”, while the remaining two are used to obtain milk for our consumption.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-media">
              <video src="/images/curd.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Made from Curd, not Cream</h3>
              <p>After boiling the milk, we turn it into rich wholesome curd overnight in an earthen pot. It takes about 30 litres of A2 milk to produce 1 litre of A2 Ghee.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-media">
              <video src="/images/churning.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Traditionally Wood Churned</h3>
              <p>The curd is hand churned using a bi-directional teak wood churner also called as bilona to produce delicious makkhan.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-media">
              <video src="/images/butter.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Slow Cooked on Cow Dung Cakes</h3>
              <p>This makkhan is then slow cooked in earthen pots over lighted cow dung cakes to produce this golden nectare called Ghee.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-media">
              <video src="/images/finalghee.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="step-number">05</div>
            <div className="step-content">
              <h3>Packaged in Glass Jars</h3>
              <p>We purposely package our A2 Ghee in glass jars so that it doesn’t get contaminated as it would in plastic jars.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
