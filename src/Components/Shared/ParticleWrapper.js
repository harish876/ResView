import Particles from "@tsparticles/react";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../Context/theme";

const themeObj = {
    background: {
        color: {
            value: "transparent",
        },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "pop"
            }
        }
    },
    particles: {
        destroy: {
            mode: "split",
            split: {
                count: 1,
                factor: {
                    value: {
                        min: 2,
                        max: 4
                    }
                },
                rate: {
                    value: 100
                },
                particles: {
                    life: {
                        count: 1,
                        duration: {
                            value: {
                                min: 2,
                                max: 3
                            }
                        }
                    },
                    move: {
                        speed: {
                            min: 2,
                            max: 5
                        }
                    }
                }
            }
        },
        number: {
            value: 50
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: {
                min: 0,
                max: 0.3
            }
        },
        size: {
            value: {
                min: 2,
                max: 4
            }
        },
        collisions: {
            enable: true,
            mode: "bounce"
        },
        move: {
            enable: true,
            speed: 1,
            outModes: "bounce"
        }
    },
}

const ParticleWrapper = ({ init, particlesLoaded }) => {
    const { theme } = useContext(ThemeContext);
    const options = useMemo(() => {
        const currentThemeObj = theme ? {
            ...themeObj,
            particles: {
                ...themeObj.particles,
                color: {
                    value: "#fff",
                }
            }
        } : {
            ...themeObj,
            particles: {
                ...themeObj.particles,
                color: {
                    value: "#0d98db",
                },
                collisions: {
                    enable: false,
                },
            }
        };
        return currentThemeObj;
    }, [theme]);

    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        );
    }

    return <></>;
};

export default ParticleWrapper;