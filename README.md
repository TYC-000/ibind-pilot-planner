# iBind™ Pilot Planner by BlotAI

An expert-system web application designed to optimize experimental parameters and fluidic dynamics for the **Invitrogen™ iBind™ Flex Western System**. This tool bridges the gap between conventional overnight manual Western Blot protocols and automated sequential lateral flow (SLF) technology.

## 🔬 Scientific Rationale & Core Logic

The iBind™ Flex Western System condenses a standard 18-hour manual incubation and washing protocol into a fixed 2.5-hour automated run. However, the significantly restricted visual fluid transit window requires strict methodology compensation to prevent false negatives or weak target signals:

### 1. Concentration-Time Compensation Rule
Based on epitope-occupancy kinetics, the brief contact time inside the microfluidic matrix necessitates a **5× to 10× increase in working antibody concentration** compared to manual overnight methods [2]. The calculation engine dynamically recalibrates manufacturer-recommended titers into precise iBind-compatible dilution factors:
- **High Affinity (≥ 1:5,000):** Compensated to a fixed 1:1,000 working dilution.
- **Medium Affinity (1:1,000 – 1:2,000):** Compensated to a fixed 1:300 working dilution.

### 2. Volumetric Optimization by Format
Total fluidic volume and reagent allocation are dynamically computed based on the targeted iBind Card Format constraints to ensure correct capillary flow velocity ($\eta$):
- **Midi Card:** Total well volume fixed at 4,000 µL.
- **Mini Card:** Total well volume fixed at 2,000 µL.
- **Multi-Strip Card:** Total well volume fixed at 1,000 µL.

$$V_{\text{Antibody}} = \frac{V_{\text{Total}}}{DF_{\text{iBind}}}$$

## 🛠️ Tech Stack & Architecture
- **Framework:** React 18 + Vite (Single Page Application)
- **Styling:** Tailwind CSS (Customized Theme based on Thermo Fisher CVI Standards)
- **Deployment:** Automated via CI/CD pipeline using the `gh-pages` build chain.

## 📄 References
1. Lamprecht, A. L., et al. (2020). Towards FAIR principles for research software. *IOS Press: Research Ideas and Outcomes*, 6, e53920.
2. Sormunen, S., et al. (2023). Evaluation of Automated Microfluidic Western Blotting Systems for Rapid Diagnostic Applications. *Methods and Protocols*, 6(2), 34.
