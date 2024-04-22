import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import './Comp2.css'

function Comp2() {
    const user = useSelector(store => store.user);
    const [selectedId, setSelectedId] = useState(null);
    
    if(!user) return;
    return (
        // <div className='comp2'>
        //     <div className='comp2-name'>
        //         {user.name}
        //     </div>
        // </div>
        <div>
            <motion.div layoutId={1} onClick={() => setSelectedId(1)} className='motion-div'>
                <motion.h2>
                    Hello 1
                </motion.h2>
                {/* {selectedId === 1 && <motion.h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui cupiditate praesentium dolorem facilis impedit perferendis, incidunt cumque consequuntur suscipit?
                </motion.h5>} */}
            </motion.div>
            <motion.div layoutId={2} onClick={() => setSelectedId(2)} className='motion-div'>
            <motion.h2>
                    Hello 2
                </motion.h2>
                {/* {selectedId === 2 && <motion.h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui cupiditate praesentium dolorem facilis impedit perferendis, incidunt cumque consequuntur suscipit?
                </motion.h5>} */}
            </motion.div>
            <AnimatePresence>
            {selectedId && (
                <motion.div layoutId={selectedId} className='motion-div-expanded'>
                <motion.h2>{`Hello ${selectedId}`}</motion.h2>
                {/* <motion.h2>{item.title}</motion.h2> */}
                <motion.button value='Button' onClick={() => setSelectedId(null)} />
                </motion.div>
            )}
            </AnimatePresence>
        </div>
        
    )
}

export default Comp2