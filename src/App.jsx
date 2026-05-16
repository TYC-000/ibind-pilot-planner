import { useState } from 'react';
import { runLogicEngine } from './logicEngine';
import IBindCardIllustration from './components/IBindCardIllustration.jsx';
import {
  IconMonoclonal, IconPolyclonal,
  IconAffinity, IconCrossAdsorbed,
  IconDilutionLow, IconDilutionMed, IconDilutionHigh,
  IconAbundanceHigh, IconAbundanceLow, IconPhospho,
  IconHumanCell, IconHumanTissue, IconNonHuman,
  IconPVDF, IconNC,
  IconStandardBuffer, IconEnhancedBuffer,
  IconCheck, IconArrowRight, IconArrowLeft, IconFlask,
  IconWarning, IconInfo, IconDanger, IconSuccess,
  IconPrint, IconReset, IconSparkle,
  IconMidiCard, IconMiniCard, IconMultiStripCard,
} from './Icons';

const TOTAL_STEPS = 3;
const INITIAL = { cardFormat: null, clonality: null, purification: null, dilution: null, abundance: null, sampleOrigin: null, membrane: null, blockingSystem: null };

// ── Card Format Selector Component ───────────────────────────────────────
const CARD_OPTIONS = [
  {
    value: 'midi',
    Icon: IconMidiCard,
    name: 'Midi 卡片',
    vol: '4,000 µL',
    detail: '適用於大面積膜片，完整蛋白樣本分析首選',
  },
  {
    value: 'mini',
    Icon: IconMiniCard,
    name: 'Mini 卡片',
    vol: '2,000 µL',
    detail: '標準尺寸卡片，適合多數常規西方墨點實驗',
  },
  {
    value: 'multistrip',
    Icon: IconMultiStripCard,
    name: '多條帶卡片',
    vol: '1,000 µL',
    detail: '多重條帶分析，節省抗體用量，適合高通量篩選',
  },
];

function CardFormatSection({ value, onChange }) {
  return (
    <div className="card-format-section">
      <div className="card-format-label">
        <span className="card-format-label-dot" />
        前置選項 — 卡片規格
      </div>
      <div className="card-format-title">iBind 卡片規格 (iBind Card Format)</div>
      <div className="card-format-desc">
        選擇實驗所用的 iBind Flex 卡匣規格。卡片規格直接決定各孔的總液體容量，所有後續體積計算（iBind 溶液、添加劑、抗體原液）均依此數值推導。
      </div>
      <div className="card-format-row" role="radiogroup" aria-label="卡片規格">
        {CARD_OPTIONS.map(opt => (
          <div
            key={opt.value}
            id={`card-${opt.value}`}
            className={`card-format-card${value === opt.value ? ' selected' : ''}`}
            onClick={() => onChange(opt.value)}
            role="radio" aria-checked={value === opt.value}
            tabIndex={0} onKeyDown={e => e.key === 'Enter' && onChange(opt.value)}
          >
            <div className="card-format-icon"><opt.Icon size={32} /></div>
            <div className="card-format-name">{opt.name}</div>
            <div className="card-format-vol">{opt.vol}</div>
            <div className="card-format-detail">{opt.detail}</div>
            <div className="card-format-check">{value === opt.value && <IconCheck size={11} />}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OptionCard({ id, selected, onSelect, Icon, name, detail }) {
  return (
    <div id={id} className={`option-card${selected ? ' selected' : ''}`}
      onClick={onSelect} role="radio" aria-checked={selected}
      tabIndex={0} onKeyDown={e => e.key === 'Enter' && onSelect()}>
      <div className="option-icon"><Icon size={20} /></div>
      <div className="option-content">
        <div className="option-name">{name}</div>
        <div className="option-detail">{detail}</div>
      </div>
      <div className="option-check">{selected && <IconCheck size={12} />}</div>
    </div>
  );
}

function SelectionPanel({ label, title, description, options, value, onChange }) {
  return (
    <div className="sel-panel">
      <div className="panel-label"><span className="panel-label-dot" />{label}</div>
      <div className="panel-title">{title}</div>
      <div className="panel-desc">{description}</div>
      <div className="option-list" role="radiogroup" aria-label={title}>
        {options.map(opt => (
          <OptionCard key={opt.value} id={`opt-${opt.value}`}
            selected={value === opt.value} onSelect={() => onChange(opt.value)}
            Icon={opt.Icon} name={opt.name} detail={opt.detail} />
        ))}
      </div>
    </div>
  );
}

function StepBar({ current, stepsDone }) {
  const steps = ['抗體屬性設定', '標的蛋白與樣本', '轉印膜與阻斷系統'];
  return (
    <div className="step-bar" role="tablist">
      {steps.map((s, i) => {
        const isDone = stepsDone > i, isActive = current === i;
        return (
          <div key={i} className={`step-item${isActive ? ' active' : ''}${isDone ? ' done' : ''}`} role="tab" aria-selected={isActive}>
            <span className="step-num">{isDone ? <IconCheck size={11} /> : i + 1}</span>
            <span className="step-label">{s}</span>
          </div>
        );
      })}
    </div>
  );
}

function ProgressDots({ current, total }) {
  return (
    <div className="progress-dots" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`p-dot${i === current ? ' active' : i < current ? ' done' : ''}`} />
      ))}
    </div>
  );
}

function AlertItem({ alert, index }) {
  const icons = { warning: <IconWarning size={18} />, danger: <IconDanger size={18} />, info: <IconInfo size={18} />, success: <IconSuccess size={18} /> };
  return (
    <div className={`alert-item ${alert.type}`} style={{ animationDelay: `${index * 80}ms` }}>
      <div className={`alert-icon ${alert.type}`}>{icons[alert.type]}</div>
      <div><div className="alert-title">{alert.title}</div><div>{alert.message}</div></div>
    </div>
  );
}

function VolCard({ label, value, unit }) {
  return (
    <div className="vol-card">
      <div className="vol-label">{label}</div>
      <div className="vol-value">{value ?? '—'}</div>
      <div className="vol-unit">{unit}</div>
    </div>
  );
}

function RecipeCard({ result, selections, onReset }) {
  const { alerts, feasibilityScore, workflowMode, volumes, checklist } = result;
  const badgeClass = { '高': 'high', '中等': 'moderate', '低': 'low', '僅限混合式': 'hybrid' }[feasibilityScore] || 'moderate';

  const chips = [
    { midi: 'Midi 卡片（4,000 µL）', mini: 'Mini 卡片（2,000 µL）', multistrip: '多條帶卡片（1,000 µL）' }[selections.cardFormat],
    { monoclonal: '單株抗體 (Monoclonal)', polyclonal: '多株抗體 (Polyclonal)' }[selections.clonality],
    { standard: '標準親和力純化 (Affinity-Purified)', 'cross-adsorbed': '經交叉吸收純化 (Cross-Adsorbed)' }[selections.purification],
    { low: '稀釋倍數 < 1:1,000', medium: '稀釋倍數 1:1,000–1:2,000', high: '稀釋倍數 ≥ 1:5,000' }[selections.dilution],
    { high: '高／中豐度蛋白', low: '低豐度蛋白', phospho: '磷酸化修飾蛋白' }[selections.abundance],
    { 'human-cell': '人類細胞裂解液', 'human-tissue': '人類組織／血液檢體', 'non-human': '非人類樣本' }[selections.sampleOrigin],
    { pvdf: 'PVDF 膜', nc: '硝化纖維素膜 (NC 膜)' }[selections.membrane],
    { standard: 'iBind 標準阻斷液', enhanced: '強化型阻斷系統 (iBind 基底 + 磷酸酶抑制劑)' }[selections.blockingSystem],
  ].filter(Boolean);

  const { primaryStep: ps, secondaryStep: ss, washStep: ws } = volumes;

  return (
    <div className="recipe-card" id="recipe-output">
      <div className="recipe-header">
        <div className="recipe-header-left">
          <h2>iBind Flex 前導實驗執行策略</h2>
          <p>產生時間：{new Date().toLocaleString('zh-TW')} · {workflowMode === 'hybrid' ? '混合式工作流程' : 'iBind 全自動化流程'}</p>
          <div className="summary-chips" style={{ marginTop: '1rem' }}>
            {chips.map(c => <span key={c} className="chip">{c}</span>)}
          </div>
        </div>
        <div className={`feasibility-badge ${badgeClass}`}>
          <span className="score-label">可行性評估</span>
          <span className="score-value">{feasibilityScore}</span>
        </div>
      </div>

      <div className="recipe-body">
        {alerts.length > 0 && (
          <div>
            <div className="section-sub">風險評估與最佳化建議</div>
            <div className="alert-list">
              {alerts.map((a, i) => <AlertItem key={i} alert={a} index={i} />)}
            </div>
          </div>
        )}

        {/* 修正後液流體積配方 */}
        <div>
          <div className="section-sub">修正後液流體積配方 (Modified Volumetric Recipe)</div>

          {/* 一次抗體 */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '.6rem' }}>
              {ps.label} · 工作稀釋倍數 1:{ps.dilutionRatio?.toLocaleString('zh-TW') ?? '—'}
            </div>
            <div className="vol-grid">
              <VolCard label="總體積" value={ps.totalVol} unit="µL" />
              {ps.ibindSolution != null
                ? <VolCard label="iBind 溶液" value={ps.ibindSolution} unit="µL" />
                : <VolCard label="阻斷緩衝液" value={ps.totalVol - ps.antibody} unit="µL" />}
              {ps.additive != null
                ? <VolCard label="iBind 添加劑" value={ps.additive} unit="µL（10%）" />
                : <VolCard label="磷酸酶抑制劑" value="加入 1×" unit="混合液" />}
            </div>
            <div className="vol-grid" style={{ marginTop: '10px' }}>
              <VolCard label="一次抗體原液" value={ps.antibody} unit="µL" />
              <div className="vol-card" style={{ gridColumn: 'span 2' }}>
                <div className="vol-label">操作備註</div>
                <div style={{ fontSize: '.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{ps.note}</div>
              </div>
            </div>
          </div>

          {/* 二次抗體 */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '.6rem' }}>
              {ss.label} · 工作稀釋倍數 1:{ss.dilutionRatio?.toLocaleString('zh-TW')}
            </div>
            <div className="vol-grid">
              <VolCard label="總體積" value={ss.totalVol} unit="µL" />
              <VolCard label="iBind 溶液" value={ss.ibindSolution} unit="µL" />
              <VolCard label="iBind 添加劑" value={ss.additive} unit="µL（10%）" />
            </div>
            <div className="vol-grid" style={{ marginTop: '10px' }}>
              <VolCard label="二次抗體原液" value={ss.antibody} unit="µL" />
              <div className="vol-card" style={{ gridColumn: 'span 2' }}>
                <div className="vol-label">操作備註</div>
                <div style={{ fontSize: '.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{ss.note}</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '.6rem' }}>{ws.label}</div>
            <div className="vol-grid">
              <VolCard label="每孔體積" value={ws.totalVol} unit="µL × 3 孔" />
              <VolCard label="iBind 溶液" value={ws.ibindSolution} unit="µL" />
              <VolCard label="iBind 添加劑" value={ws.additive} unit="µL（10%）" />
            </div>
          </div>
        </div>

        {/* 操作流程清單 */}
        <div>
          <div className="section-sub">逐步操作技術流程</div>
          <div className="checklist">
            {checklist.map((item, i) => (
              <div key={i} className="check-item" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="check-num">{i + 1}</div>
                <div>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="nav-row" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
          <button className="btn btn-ghost" id="btn-reset" onClick={onReset}>
            <IconReset size={15} />重新分析
          </button>
          <button className="btn btn-outline" id="btn-print" onClick={() => window.print()}>
            <IconPrint size={15} />列印 / 匯出 PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 步驟面板資料 ──────────────────────────────────────────────────────────
const STEP0 = [
  {
    key: 'clonality', label: '第 A 節 — 抗體屬性', title: '抗體株型 (Clonality)',
    description: '選擇一次抗體的株型。單株／重組抗體識別單一抗原決定簇，具高度特異性；多株抗體識別多個抗原決定簇，靈敏度較高但親和力組成異質。',
    options: [
      { value: 'monoclonal', Icon: IconMonoclonal, name: '單株抗體 (Monoclonal / Recombinant)', detail: '單一抗原決定簇，高度特異性，批次間一致性佳。適合 iBind 全自動化流程。' },
      { value: 'polyclonal', Icon: IconPolyclonal, name: '多株抗體 (Polyclonal)', detail: '多抗原決定簇之異質性抗體池。靈敏度較高，但各次族群親和力差異大，微流體條件下需謹慎評估。' },
    ],
  },
  {
    key: 'purification', label: '第 A 節 — 抗體屬性', title: '二次抗體純化方式',
    description: '處理人類來源樣本時為關鍵選項。經交叉吸收純化的二次抗體已充分預吸收以去除對人類 IgG 的反應，可消除 50 kDa 及 25 kDa 的內源性 IgG 干擾條帶。',
    options: [
      { value: 'standard', Icon: IconAffinity, name: '標準親和力純化 (Standard Affinity-Purified)', detail: '通用型純化方式。適用於非人類樣本或無細胞系統。' },
      { value: 'cross-adsorbed', Icon: IconCrossAdsorbed, name: '經交叉吸收純化 (Cross-Adsorbed)', detail: '已針對人類 IgG 重鏈／輕鏈進行充分預吸收。組織或血液檢體實驗之必要選項。' },
    ],
  },
  {
    key: 'dilution', label: '第 A 節 — 抗體屬性', title: '廠商建議稀釋倍數',
    description: '抗體規格書上針對標準過夜孵育所建議的工作稀釋倍數。iBind 系統縮短了抗原抗體接觸時間，需依此調整濃度以維持抗原表位佔有率動力學 (epitope-occupancy kinetics)。',
    options: [
      { value: 'low', Icon: IconDilutionLow, name: '低稀釋倍數 — < 1:1,000', detail: '工作濃度高。在快速微流體條件下有動力學飽和偽影風險。' },
      { value: 'medium', Icon: IconDilutionMed, name: '中等稀釋倍數 — 1:1,000 至 1:2,000', detail: '標準稀釋範圍。稍作調整後通常與 iBind 流程相容。' },
      { value: 'high', Icon: IconDilutionHigh, name: '高稀釋倍數 — ≥ 1:5,000', detail: '起始濃度低。需向上補償濃度以因應 iBind 縮短的接觸時間。' },
    ],
  },
];

const STEP1 = [
  {
    key: 'abundance', label: '第 B 節 — 標的蛋白', title: '目標蛋白豐度',
    description: '估計目標蛋白在樣本中的表現量。磷酸化修飾蛋白因修飾狀態瞬息萬變，需特別考量阻斷液相容性與磷酸酶污染問題。',
    options: [
      { value: 'high', Icon: IconAbundanceHigh, name: '高／中豐度蛋白', detail: '標準方法可清晰偵測。如 GAPDH、β-actin、Tubulin 等管家蛋白。訊號穩健，預期可行性高。' },
      { value: 'low', Icon: IconAbundanceLow, name: '低豐度蛋白 (Low Abundance)', detail: '弱表現量目標蛋白。如細胞激素、轉錄因子、訊息傳遞中間分子。需最佳化動力學條件。' },
      { value: 'phospho', Icon: IconPhospho, name: '磷酸化修飾蛋白 (Phosphorylation-Dependent)', detail: '磷酸化特異性偵測。如 pERK、pAKT、pH2AX。對阻斷液組成及磷酸酶污染高度敏感。' },
    ],
  },
  {
    key: 'sampleOrigin', label: '第 B 節 — 樣本來源', title: '樣本來源',
    description: '樣本的生物來源決定內源性 IgG 干擾風險。人類組織與血液樣本含大量內源性免疫球蛋白，可能產生假性條帶。',
    options: [
      { value: 'human-cell', Icon: IconHumanCell, name: '人類細胞裂解液 (Human Cell Lysate)', detail: '培養人類細胞株（HEK293、HeLa、Jurkat 等）。除 B 細胞衍生細胞株外，內源性 IgG 含量低。' },
      { value: 'human-tissue', Icon: IconHumanTissue, name: '人類組織／血液檢體 (Human Tissue/Blood)', detail: '原代組織切片、PBMC、血清、血漿或全血。內源性 IgG 含量高 — 高風險區域，需特別防範。' },
      { value: 'non-human', Icon: IconNonHuman, name: '非人類樣本 (Non-Human Specimen)', detail: '小鼠、大鼠、兔子或其他動物組織／細胞。內源性 IgG 不與人類二次抗體發生交叉反應。' },
    ],
  },
];

const STEP2 = [
  {
    key: 'membrane', label: '第 C 節 — 轉印膜材質', title: '轉印膜材質 (Membrane Matrix)',
    description: '轉印膜基材影響蛋白質結合容量、背景雜訊滯留，以及剝膜再探 (stripping/re-probing) 的可行性。',
    options: [
      { value: 'pvdf', Icon: IconPVDF, name: 'PVDF 膜 (Polyvinylidene Fluoride)', detail: '較高蛋白質結合容量（150–200 µg/cm²）。適合低分子量蛋白質及多次再探。使用前須以甲醇活化。' },
      { value: 'nc', Icon: IconNC, name: '硝化纖維素膜 (NC 膜)', detail: '背景較低，大多數應用的訊噪比更佳。結合容量約 80–100 µg/cm²。質地較脆，再探次數有限。' },
    ],
  },
  {
    key: 'blockingSystem', label: '第 C 節 — 阻斷系統', title: '阻斷系統 (Blocking System)',
    description: '阻斷劑用於飽和膜面上的非特異性結合位點，選擇直接影響磷酸化抗原決定簇的偵測效果及背景雜訊水平。',
    options: [
      { value: 'standard', Icon: IconStandardBuffer, name: 'iBind 標準阻斷液 (iBind Standard Buffer)', detail: 'iBind 專利酪蛋白／BSA 配方，針對一般西方墨點應用最佳化。可能干擾磷酸化抗原決定簇偵測。' },
      { value: 'enhanced', Icon: IconEnhancedBuffer, name: '強化型阻斷系統 (iBind 基底 + 磷酸酶抑制劑)', detail: '以 iBind 專利阻斷液為基礎，由實驗人員自行滴加磷酸酶抑制劑混合液 (如 NaF/Vanadate)。專為磷酸化目標蛋白設計，既能維持 iBind 微流體層流的精準流速，又能防止磷酸根降解。若抗體極度排斥酪蛋白，系統將建議切換至手動一抗過夜之「混合工作流」。' },
    ],
  },
];

// ── 主應用程式 ────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState(INITIAL);
  const [result, setResult] = useState(null);

  const set = key => val => setSelections(prev => ({ ...prev, [key]: val }));
  const s0ok = selections.cardFormat && selections.clonality && selections.purification && selections.dilution;
  const s1ok = selections.abundance && selections.sampleOrigin;
  const s2ok = selections.membrane && selections.blockingSystem;
  const stepsDone = s0ok ? (s1ok ? (s2ok ? 3 : 2) : 1) : 0;

  function handleGenerate() {
    setResult(runLogicEngine(selections));
    setTimeout(() => document.getElementById('recipe-output')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
  function handleReset() {
    setSelections(INITIAL); setResult(null); setStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (result) return (
    <div className="app-shell">
      <TopBar />
      <main className="main-content">
        <div className="section-header">
          <h1><span className="gradient-text">前導實驗執行策略</span></h1>
          <p>根據您選擇的 iBind Flex 實驗配置，由專家系統評估所有風險標記，請於執行前詳閱各項建議。</p>
        </div>
        
        <div className="split-layout reverse-mobile">
          <div className="split-left">
            <RecipeCard result={result} selections={selections} onReset={handleReset} />
          </div>
          <div className="split-right">
            <div className="sticky-illustration">
              <div className="wizard-illustration-wrap">
                <IBindCardIllustration />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <div className="app-shell">
      <TopBar />
      <main className="main-content">
        <div className="section-header">
          <h1><span className="gradient-text">iBind Flex</span> 前導實驗規劃系統</h1>
          <p>請依序設定以下實驗參數。專家系統將依據 iBind Flex 微流體動力學限制與生化干擾規則，對您的選擇進行評估，並產生客製化的前導實驗執行策略。</p>
        </div>

        <div className="split-layout">
          <div className="split-left">
            <StepBar current={step} stepsDone={stepsDone} />

            {step === 0 && (
              <>
                <CardFormatSection value={selections.cardFormat} onChange={set('cardFormat')} />
                <div className="panel-grid">
                  {STEP0.map(({ key: k, ...p }) => <SelectionPanel key={k} {...p} value={selections[k]} onChange={set(k)} />)}
                </div>
                <div className="nav-row">
                  <ProgressDots current={0} total={TOTAL_STEPS} />
                  <button id="btn-next-step1" className="btn btn-primary" disabled={!s0ok} onClick={() => setStep(1)}>
                    下一步：標的蛋白與樣本 <IconArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="panel-grid">
                  {STEP1.map(({ key: k, ...p }) => <SelectionPanel key={k} {...p} value={selections[k]} onChange={set(k)} />)}
                </div>
                <div className="nav-row">
                  <button className="btn btn-ghost" onClick={() => setStep(0)}><IconArrowLeft size={15} /> 返回</button>
                  <ProgressDots current={1} total={TOTAL_STEPS} />
                  <button id="btn-next-step2" className="btn btn-primary" disabled={!s1ok} onClick={() => setStep(2)}>
                    下一步：轉印膜與阻斷系統 <IconArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="panel-grid">
                  {STEP2.map(({ key: k, ...p }) => <SelectionPanel key={k} {...p} value={selections[k]} onChange={set(k)} />)}
                </div>
                <div className="nav-row">
                  <button className="btn btn-ghost" onClick={() => setStep(1)}><IconArrowLeft size={15} /> 返回</button>
                  <ProgressDots current={2} total={TOTAL_STEPS} />
                  <button id="btn-generate" className="btn btn-generate" disabled={!s2ok} onClick={handleGenerate}>
                    <IconSparkle size={16} /> 產生前導實驗策略 <IconFlask size={16} />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="split-right">
            <div className="sticky-illustration">
              <div className="wizard-illustration-wrap">
                <IBindCardIllustration />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <header className="top-bar" role="banner">
      <div className="top-bar-brand">
        <div className="top-bar-logo" aria-hidden="true">iB</div>
        <div>
          <div className="top-bar-title">iBind Flex 前導實驗規劃系統</div>
          <div className="top-bar-subtitle">西方墨點法專家決策系統</div>
        </div>
      </div>
      <div className="brand-badge" aria-label="iBind™ Pilot Planner by BlotAI">
        <span className="brand-badge-product">iBind™ Pilot Planner</span>
        <span className="brand-badge-divider" aria-hidden="true" />
        <span className="brand-badge-creator">by <span>BlotAI</span></span>
      </div>
    </header>
  );
}

