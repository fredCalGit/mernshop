import React from 'react';
import usaSVG from './svgimage/usaSVG.svg';

const justforfun = () => {
  var a = document.getElementById('svgObject');
  var svgDoc;
  var svgItem;
  return (
    <div>
      <object
        id="svgObject"
        data={usaSVG}
        type="image/svg+xml"
        height="50"
        width="50"
      ></object>
      <script>
        {(svgDoc = a.contentDocument)}
        {(svgItem = svgDoc.getElementById('svgItem'))}
      </script>

      {console.log(svgItem)}
    </div>
  );
};

export default justforfun;
