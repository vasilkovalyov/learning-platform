import React from 'react'

const timeZones = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function StudentPrivateDataForm() {
  return (
    <form name="private-data-user" autoComplete="off" className="form form-admin">
      <div>
        <div>
          <div className="form__input-field form__input-field--input">
            <input id="country" name="country" type="country" className="form__input" />
          </div>
          <div className="form__input-field form__input-field--input">
            <input id="state" name="state" type="state" className="form__input" />
          </div>
          <div className="form__input-field form__input-field--input">
            <input id="city" name="city" type="city" className="form__input" />
          </div>
          <div
            // label="Local time"
            // name="local_time"
            className="form__input-field form__input-field--select"
          >
            {/* <select id="local_time" className="form__select" showSearch optionFilterProp="children">
              {timeZones &&
                timeZones.length &&
                timeZones.map((tm, index) => (
                  <li key={index} value={tm}>
                    GMT{tm > 0 ? '+' : ' '}
                    {tm}
                  </li>
                ))}
            </select> */}
          </div>
        </div>
        <div>
          <div className="form__input-field form__input-field--textarea">
            <textarea id="about_info" name="about_info" className="form__textarea" rows={6} />
          </div>
        </div>
      </div>
      <div className="form__input-field form__input-field--button">
        <button>Save changes</button>
      </div>
    </form>
  )
}

export default StudentPrivateDataForm
