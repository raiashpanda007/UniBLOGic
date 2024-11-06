import React from 'react'

function Message_Input() {
  return (
    <div
                className="w-full min-h-16  border"
                style={{ position: "absolute", bottom: 10 }}
              >
                <div className="h-32 w-full  border">
                    <div className="h-20 w-full border">

                    </div>
                    <div className="h-10 w-full  border">

                    </div>

                </div>
                <div className="h-16 w-full border">

                </div>
                
                {/* Now this div is positioned at the bottom of the parent and doesn't scroll */}
              </div>
  )
}

export default Message_Input