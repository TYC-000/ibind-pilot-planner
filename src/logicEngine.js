/**
 * iBind Flex 前導實驗規劃系統 — 專家生化邏輯引擎 v2
 * 依據 Thermo Fisher iBind Flex 官方體積標準與 5–10× 濃度補償規則重新計算。
 */

// ── 卡片規格對應孔容量 ─────────────────────────────────────────────────────
const CARD_VOLUMES = {
  midi:       4000,  // µL
  mini:       2000,  // µL
  multistrip: 1000,  // µL
};

// ── iBind 工作稀釋倍數補償規則（Thermo Fisher 官方） ─────────────────────
//   高稀釋倍數（≥ 1:5,000）  → iBind 工作稀釋 1:1,000（5× 濃縮補償）
//   中等稀釋倍數（1:1,000–1:2,000）→ iBind 工作稀釋 1:300（3–6× 濃縮補償）
//   低稀釋倍數（< 1:1,000）  → 觸發混合式工作流程；手動孵育倍數 1:500

const IBIND_DILUTION_MAP = {
  high:   1000,  // 補償後 iBind 工作稀釋倍數
  medium:  300,  // 補償後 iBind 工作稀釋倍數
  low:     500,  // 僅用於手動孵育計算；低稀釋倍數強制觸發 hybrid
};

const SECONDARY_DILUTION = 1000; // 二次抗體標準 iBind 工作稀釋倍數

// ── 主要邏輯引擎 ──────────────────────────────────────────────────────────
export function runLogicEngine(selections) {
  const { clonality, purification, dilution, abundance, sampleOrigin, membrane, blockingSystem, cardFormat } = selections;

  const alerts = [];
  let feasibilityScore = '高';
  let workflowMode = 'full-ibind';

  // ── 規則 1：人類組織 IgG 干擾 ───────────────────────────────────────────
  if (sampleOrigin === 'human-tissue' && purification === 'standard') {
    alerts.push({
      type: 'danger',
      title: '人類組織內源性 IgG 干擾 — 高風險',
      message:
        '人類組織／血液裂解液中含有大量內源性免疫球蛋白 (IgG)。使用標準親和力純化二抗時，無法區分您的一次抗體與內源性 IgG，將在 ~50 kDa（重鏈）與 ~25 kDa（輕鏈）位置產生強烈的非特異性背景條帶。' +
        '\n\n【首推標竿】依據 iBind 微流體動力學文獻規範（Sormunen et al., 2023），首選使用 Invitrogen（Thermo Fisher）高度交叉吸收純化 (Highly Cross-Adsorbed) 二次抗體系列（如 Cat# A16066 / A16110）或 Invitrogen Superclonal™ 重組二抗系列。其結合動力學 (Binding kinetics) 已針對 iBind 側向層流完成最佳化驗證，具備極佳的物理流速相容性，能徹底排除人類內源性 IgG 造成的 50 kDa / 25 kDa 雜帶干擾。' +
        '\n\n【跨品牌相容替代方案】經驗證可相容之替代品：Millipore AP307P / AP308P（Merck/Sigma-Aldrich），或 Jackson ImmunoResearch 高度交叉吸收純化系列，均已預吸收去除對人類 IgG 的交叉反應，可視試劑庫存選用。',
    });
    if (feasibilityScore === '高') feasibilityScore = '中等';
  }

  // ── 規則 2：微流體動力學失效（低稀釋 + 多株 + 低豐度/磷酸化）──────────
  if (clonality === 'polyclonal' && dilution === 'low' && (abundance === 'low' || abundance === 'phospho')) {
    alerts.push({
      type: 'danger',
      title: '微流體動力學失效風險 — 需採用混合式工作流程',
      message:
        '多株抗體池在高濃度（稀釋倍數 < 1:1,000）條件下，包含親和力差異懸殊的異質性次族群。iBind Flex 的層流式接觸時間（約 30–45 分鐘）不足以讓低親和力次株在低豐度或磷酸化抗原上達到結合平衡，預期失效模式：訊號完全缺失，或大量顆粒狀雜訊。建議措施：一次抗體在 4°C 手動孵育過夜（12–16 小時），再移至 iBind Flex 自動化處理二次抗體結合與清洗步驟。',
    });
    feasibilityScore = '僅限混合式';
    workflowMode = 'hybrid';
  }

  // ── 規則 3：單株抗體高稀釋倍數濃度補償 ────────────────────────────────
  if (clonality === 'monoclonal' && dilution === 'high') {
    alerts.push({
      type: 'info',
      title: '濃度–時間補償建議（單株高稀釋抗體）',
      message:
        '高親和力單株抗體（廠商建議 ≥ 1:5,000）可安全進行 iBind 全自動化流程。依據 Thermo Fisher 官方補償規則，iBind 孔內工作稀釋倍數需調整至 1:1,000（約 5× 濃縮補償），以因應微流體縮短的接觸時間並維持等效的抗原表位佔有率動力學 (epitope-occupancy kinetics)。由於單株抗體僅識別單一抗原決定簇，此補償不會增加非特異性背景。',
    });
  }

  // ── 規則 3b：中等稀釋倍數補償提示 ─────────────────────────────────────
  if (dilution === 'medium' && workflowMode !== 'hybrid') {
    alerts.push({
      type: 'info',
      title: '中等稀釋倍數 iBind 濃度補償',
      message:
        '廠商建議稀釋倍數 1:1,000–1:2,000 的抗體，在 iBind Flex 孔內需調整工作稀釋至 1:300（約 3–6× 濃縮補償），以確保在縮短的微流體接觸窗口內達到充分的抗體-抗原結合效率。請確認此濃度下背景雜訊仍在可接受範圍。',
    });
  }

  // ── 規則 4：磷酸化標的之阻斷液干擾 ────────────────────────────────────
  if (abundance === 'phospho' && blockingSystem === 'standard') {
    alerts.push({
      type: 'warning',
      title: '磷酸化抗原決定簇遮蔽警告（阻斷液干擾）',
      message:
        '酪蛋白（脫脂奶粉）為基礎的標準阻斷液含有大量內源性磷酸蛋白（主要為酪蛋白）及磷酸酶活性，將直接競爭磷酸化抗原決定簇，導致訊號抑制或偽陰性結果；殘留磷酸酶亦可能使目標蛋白去磷酸化。建議措施：改用 BSA 阻斷液（1–3% BSA in TBST）並全程添加磷酸酶抑制劑混合液（1 mM 正釩酸鈉 Na₃VO₄、10 mM 氟化鈉 NaF）。',
    });
    if (feasibilityScore === '高') feasibilityScore = '中等';
  }

  // ── 規則 5：PVDF 膜疏水背景 ────────────────────────────────────────────
  if (membrane === 'pvdf') {
    alerts.push({
      type: 'info',
      title: 'PVDF 膜疏水背景提示',
      message:
        '相較於 NC 膜，PVDF 膜因高疏水性而具有較高的非特異性蛋白質滯留。在 iBind 快速自動化側向液流條件下，若阻斷不完全，可能表現為整體灰霧感，尤其在使用聚合物放大型 HRP 偵測系統時。若背景雜訊無法接受，建議改用 NC 膜；若須維持 PVDF，可將 iBind 阻斷添加劑濃度提高 0.5×。',
    });
  }

  const volumes = computeVolumes(selections, workflowMode);
  const checklist = buildChecklist(selections, workflowMode);

  return { alerts, feasibilityScore, workflowMode, volumes, checklist };
}

// ── 體積計算（Thermo Fisher iBind Flex 官方標準） ─────────────────────────
function computeVolumes(sel, workflowMode) {
  // 1. 從卡片規格取得孔容量
  const totalVol = CARD_VOLUMES[sel.cardFormat] ?? 2000;

  // 2. iBind 添加劑 = 精確 10% 總容量
  const additiveVol = Math.round(totalVol * 0.10);

  // 3. 一次抗體稀釋倍數（依官方補償規則）
  let primaryDilution;
  let manualTotalVol = null;
  let manualAdditive = null;

  if (workflowMode === 'hybrid') {
    // 混合式：手動孵育計算（3 mL 系統體積）
    manualTotalVol = 3000;
    primaryDilution = IBIND_DILUTION_MAP.low; // 1:500
    manualAdditive = null; // 使用阻斷緩衝液，不用 iBind 添加劑
  } else if (sel.dilution === 'high') {
    primaryDilution = IBIND_DILUTION_MAP.high;   // 1:1,000
  } else {
    primaryDilution = IBIND_DILUTION_MAP.medium; // 1:300
  }

  // 4. 計算抗體原液體積與 iBind 溶液體積
  const primaryAntibodyVol = workflowMode === 'hybrid'
    ? parseFloat((manualTotalVol / primaryDilution).toFixed(1))
    : parseFloat((totalVol / primaryDilution).toFixed(1));

  const primaryIbindSolVol = workflowMode === 'hybrid'
    ? null
    : parseFloat((totalVol - additiveVol - primaryAntibodyVol).toFixed(1));

  // 5. 二次抗體（統一 1:1,000 iBind 工作稀釋）
  const secondaryAntibodyVol = parseFloat((totalVol / SECONDARY_DILUTION).toFixed(1));
  const secondaryIbindSolVol = parseFloat((totalVol - additiveVol - secondaryAntibodyVol).toFixed(1));

  // 6. 清洗液
  const washAdditive   = Math.round(totalVol * 0.10);
  const washIbindSol   = totalVol - washAdditive;

  const cardLabel = { midi: 'Midi 卡片', mini: 'Mini 卡片', multistrip: '多條帶卡片' }[sel.cardFormat] ?? '—';

  return {
    cardLabel,
    totalVol,
    primaryStep: {
      label: workflowMode === 'hybrid' ? '一次抗體（手動離機孵育）' : `一次抗體孔（iBind ${cardLabel} 第 1 孔）`,
      totalVol: workflowMode === 'hybrid' ? manualTotalVol : totalVol,
      ibindSolution: primaryIbindSolVol,
      additive: workflowMode === 'hybrid' ? null : additiveVol,
      antibody: primaryAntibodyVol,
      dilutionRatio: primaryDilution,
      note: workflowMode === 'hybrid'
        ? `以 ${manualTotalVol} µL 阻斷緩衝液配製（1:${primaryDilution}），4°C 搖晃孵育過夜 12–16 小時`
        : `廠商建議倍數補償後 iBind 工作稀釋：1:${primaryDilution}；加入卡匣第 1 孔`,
    },
    secondaryStep: {
      label: `二次抗體孔（iBind ${cardLabel} 第 3 孔）`,
      totalVol,
      ibindSolution: secondaryIbindSolVol,
      additive: additiveVol,
      antibody: secondaryAntibodyVol,
      dilutionRatio: SECONDARY_DILUTION,
      note: `iBind 標準工作稀釋 1:${SECONDARY_DILUTION}；使用${sel.purification === 'cross-adsorbed' ? '經交叉吸收純化 (Cross-Adsorbed)' : '標準親和力純化 (Affinity-Purified)'}二次抗體`,
    },
    washStep: {
      label: `清洗液（第 4–6 孔，各 ${totalVol} µL）`,
      totalVol,
      ibindSolution: washIbindSol,
      additive: washAdditive,
      antibody: 0,
      note: '1× iBind 溶液（90%）+ iBind 添加劑（10%）· 分別填滿第 4、5、6 孔',
    },
  };
}

// ── 操作流程清單 ──────────────────────────────────────────────────────────
function buildChecklist(sel, workflowMode) {
  const steps = [];

  if (sel.membrane === 'pvdf') {
    steps.push({ text: 'PVDF 膜活化：將膜浸入 100% 甲醇 15 秒，以去離子水沖洗 2 分鐘，再於 1× 轉膜緩衝液中平衡 5 分鐘。切勿使 PVDF 膜乾燥。' });
  } else {
    steps.push({ text: '硝化纖維素膜（NC 膜）前處理：以去離子水快速沖洗後，置於 1× 轉膜緩衝液中平衡 5 分鐘。全程避免膜面乾燥。' });
  }

  if (sel.abundance === 'phospho') {
    steps.push({ text: '轉印膜親水預濕（磷酸化偵測模式）：將膜置於 distilled water 中浸泡 2 分鐘（PVDF 膜需先以甲醇浸泡活化），再移至含磷酸酶抑制劑的 1× iBind 溶液（加入 1 mM Na₃VO₄ + 10 mM NaF）中潤濕 2 分鐘。【重要】本流程無需手動阻斷，iBind 系統將透過 Well 2（阻斷孔）自動執行順序阻斷。若研究人員選擇在離機狀態以 1–3% BSA in TBST 進行手動補強阻斷，則上機前必須以 TBST 充分清洗膜面 3 次 × 10 分鐘，以防止過量蛋白質阻塞卡匣微流體流道。' });
  } else {
    steps.push({ text: '轉印膜親水預濕（標準全自動流程）：將轉印膜置於 distilled water 中浸泡 2 分鐘（若為 PVDF 膜需先經甲醇浸泡），隨後放入 1× iBind 溶液中潤濕 2 分鐘。無需手動阻斷，iBind 系統將在上機後透過 Well 2 自動執行順序阻斷（Sequential Lateral Flow, SLF）。請勿於轉印膜上手動施加 5% 奶粉或 BSA 阻斷液，以免蛋白質過量堆積阻塞卡匣微流體流道，導致流速異常或訊號缺失。' });
  }

  if (workflowMode === 'hybrid') {
    steps.push({ text: '一次抗體孵育（手動離機操作 — 混合工作流）：依配方體積配製於 3,000 µL 阻斷液中，密封容器置 4°C 搖晃孵育過夜（12–16 小時）。【關鍵】孵育結束後，務必以 1× TBST 充分清洗膜面 3 次 × 10 分鐘，徹底去除殘留阻斷液蛋白質，方可將膜放入 iBind Flex 卡匣，以防止微流體流道阻塞。' });
  } else {
    steps.push({ text: '一次抗體配製：依本配方精確量取抗體原液，加入 iBind 溶液與添加劑混合。於上機前立即加入卡匣第 1 孔。' });
  }

  steps.push({ text: `iBind Flex 卡匣組裝（${sel.cardFormat === 'midi' ? 'Midi 4,000 µL' : sel.cardFormat === 'mini' ? 'Mini 2,000 µL' : '多條帶 1,000 µL'} 規格）：蛋白面朝下置膜 (Protein-side DOWN)，確保目標蛋白與卡匣流道基質直接接觸。輕放流道蓋避免氣泡。依序填入各孔，確認無氣泡後密封。` });

  if (sel.purification === 'cross-adsorbed' || sel.sampleOrigin === 'human-tissue') {
    steps.push({ text: '二次抗體選用（關鍵步驟）：務必使用高度交叉吸收純化 (Highly Cross-Adsorbed) 二次抗體。【首推】Invitrogen（Thermo Fisher）Highly Cross-Adsorbed 系列（Cat# A16066 / A16110）或 Superclonal™ 重組二抗系列，結合動力學已針對 iBind 側向層流最佳化，可徹底排除人類內源性 IgG 於 50 kDa / 25 kDa 之雜帶干擾。【替代方案】Millipore AP307P / AP308P 或 Jackson ImmunoResearch 高度交叉吸收系列，經驗證相容。依配方加入第 3 孔。' });
  } else {
    steps.push({ text: '二次抗體：依配方加入第 3 孔。確認二次抗體宿主物種與一次抗體來源物種相符。' });
  }

  steps.push({ text: 'iBind Flex 執行：密封後放置儀器，選擇標準西方墨點程式（約 2.5 小時，室溫）。執行期間勿移動儀器。' });
  steps.push({ text: '化學冷光偵測：取出膜，加入 HRP 受質（SuperSignal ECL，1–5 分鐘），CCD 影像系統攝影。磷酸化目標先拍 30 秒短曝光再延長。' });

  if (sel.membrane === 'pvdf') {
    steps.push({ text: '選用 — 剝膜再探：使用溫和剝膜液（2% SDS、62.5 mM Tris pH 6.8、100 mM β-巰基乙醇，50°C 30 分鐘），重新阻斷後再探。PVDF 膜可支援 3–5 次循環。' });
  }

  return steps;
}
